-- Alert records: evaluated alerts linked to watch areas and users
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  watch_area_id uuid not null references public.watch_areas (id) on delete cascade,
  disease_id text not null,
  animal_type text not null check (animal_type in ('bovine', 'porcine', 'avian')),
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  title_en text not null,
  title_es text not null,
  message_en text not null,
  message_es text not null,
  hex_cell_id text,
  triggered_at timestamptz not null default now(),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index for fast lookup by owner
create index alerts_user_id_idx on public.alerts (user_id);
create index alerts_watch_area_id_idx on public.alerts (watch_area_id);

-- RLS
alter table public.alerts enable row level security;

create policy "alerts: owner select"
  on public.alerts for select
  using (auth.uid() = user_id);

create policy "alerts: owner update"
  on public.alerts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Only service role can insert alerts (evaluation is server-side)
-- No delete policy for users
