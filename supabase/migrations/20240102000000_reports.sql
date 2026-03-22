-- Reports table: collaborative disease reports submitted by members
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  disease_id text not null,
  animal_type text not null check (animal_type in ('bovine', 'porcine', 'avian')),
  source text not null check (source in ('public_dataset', 'user_report')),
  visibility text not null default 'private' check (visibility in ('private', 'collaborative', 'public')),
  status text not null default 'pending_review' check (status in ('accepted', 'pending_review', 'rejected')),
  reported_at timestamptz not null,
  notes text,
  notes_locale text check (notes_locale in ('en', 'es')),
  hex_cell_id text,
  territory_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reuse the set_updated_at trigger function from profiles migration
drop trigger if exists reports_set_updated_at on public.reports;
create trigger reports_set_updated_at
  before update on public.reports
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.reports enable row level security;

-- Users can insert their own reports
create policy "reports: owner insert"
  on public.reports for insert
  with check (auth.uid() = user_id);

-- Users can read their own reports
create policy "reports: owner select"
  on public.reports for select
  using (auth.uid() = user_id);

-- No update or delete policies for regular users — reports are immutable after submission.
-- Service role bypasses RLS and can perform all operations (pipeline processing, status updates).
