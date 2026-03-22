-- Monitoring portfolios: named groups of watch areas for Pro accounts
create table if not exists public.monitoring_portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  description text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for fast lookup by owner
create index monitoring_portfolios_user_id_idx on public.monitoring_portfolios (user_id);

-- Reuse existing set_updated_at() trigger function from profiles migration
create trigger monitoring_portfolios_set_updated_at
  before update on public.monitoring_portfolios
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.monitoring_portfolios enable row level security;

create policy "monitoring_portfolios: owner select"
  on public.monitoring_portfolios for select
  using (auth.uid() = user_id);

create policy "monitoring_portfolios: owner insert"
  on public.monitoring_portfolios for insert
  with check (auth.uid() = user_id);

create policy "monitoring_portfolios: owner update"
  on public.monitoring_portfolios for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "monitoring_portfolios: owner delete"
  on public.monitoring_portfolios for delete
  using (auth.uid() = user_id);

-- Add portfolio_id to watch_areas, linking a watch area to a portfolio
alter table public.watch_areas
  add column portfolio_id uuid references public.monitoring_portfolios (id) on delete set null;
