-- Watch areas table: saved monitoring areas linked to user accounts
create table if not exists public.watch_areas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  animal_types text[] not null,
  hex_cell_ids text[] not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint watch_areas_animal_types_valid
    check (animal_types <@ array['bovine', 'porcine', 'avian']::text[])
);

-- Index for fast lookup by owner
create index watch_areas_user_id_idx on public.watch_areas (user_id);

-- Reuse existing set_updated_at() trigger function from profiles migration
create trigger watch_areas_set_updated_at
  before update on public.watch_areas
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.watch_areas enable row level security;

create policy "watch_areas: owner select"
  on public.watch_areas for select
  using (auth.uid() = user_id);

create policy "watch_areas: owner insert"
  on public.watch_areas for insert
  with check (auth.uid() = user_id);

create policy "watch_areas: owner update"
  on public.watch_areas for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "watch_areas: owner delete"
  on public.watch_areas for delete
  using (auth.uid() = user_id);
