-- Run this whole file once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run

create extension if not exists "pgcrypto";

-- One row per wedding. You'll insert the real row for Rayaan & Qudsiyyah after running this.
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_time timestamptz not null,       -- when the event/reveal-clock starts
  reveal_delay_hours numeric not null default 12,
  shot_limit integer not null default 20,
  prompts text[] not null default '{}',   -- the shot list guests see (one string per prompt)
  admin_key text not null,               -- host uses this to view /host dashboard
  notified boolean not null default false, -- flips true once reveal emails have gone out
  created_at timestamptz default now()
);

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  name text,
  email text,
  shots_taken integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  guest_id uuid references guests(id) on delete cascade,
  storage_path text not null,
  prompt text,                           -- which shot-list item this photo was for (null = free shot)
  created_at timestamptz default now()
);

-- Storage bucket for the actual photo files
insert into storage.buckets (id, name, public)
values ('wedding-photos', 'wedding-photos', true)
on conflict (id) do nothing;

-- Row Level Security
alter table events enable row level security;
alter table guests enable row level security;
alter table photos enable row level security;

-- Kept deliberately open (read/insert only, no delete/update-by-anyone-else) since this
-- is a single private event link, not a multi-tenant public product. Good enough for a
-- wedding; do NOT reuse this schema as-is for a public multi-event product.
drop policy if exists "public read events" on events;
create policy "public read events" on events for select using (true);
drop policy if exists "public update events notified" on events;
create policy "public update events notified" on events for update using (true);
drop policy if exists "public read guests" on guests;
create policy "public read guests" on guests for select using (true);
drop policy if exists "public insert guests" on guests;
create policy "public insert guests" on guests for insert with check (true);
drop policy if exists "public update guests" on guests;
create policy "public update guests" on guests for update using (true);
drop policy if exists "public read photos" on photos;
create policy "public read photos" on photos for select using (true);
drop policy if exists "public insert photos" on photos;
create policy "public insert photos" on photos for insert with check (true);

drop policy if exists "storage public read" on storage.objects;
create policy "storage public read" on storage.objects
  for select using (bucket_id = 'wedding-photos');
drop policy if exists "storage public insert" on storage.objects;
create policy "storage public insert" on storage.objects
  for insert with check (bucket_id = 'wedding-photos');

-- Already ran an earlier version of this file? Run just these two lines instead:
-- alter table events add column if not exists prompts text[] not null default '{}';
-- alter table photos add column if not exists prompt text;

-- ---------------------------------------------------------------------------
-- LAST STEP (do this after running the above): create the actual event row.
-- 1. Change the date/time in start_time (keep the +02:00 = South African time).
-- 2. Change 'choose-a-secret-string' to your own host password (you use it at /host).
-- 3. Uncomment and run this block on its own.
-- The album unlocks reveal_delay_hours after start_time.
-- ---------------------------------------------------------------------------
-- insert into events (name, start_time, reveal_delay_hours, shot_limit, admin_key, prompts)
-- values (
--   'Rayaan & Qudsiyyah Wedding',
--   '2026-MM-DDTHH:MM:00+02:00', 6, 12, 'choose-a-secret-string',
--   array[
--     'The couple, caught mid-smile',
--     'The prettiest flowers you can find',
--     'Family together in one frame',
--     'Someone making dua',
--     'A hug caught in the act',
--     'The décor, up close',
--     'Something gold',
--     'The food table',
--     'Your favourite person here',
--     'Friends being silly',
--     'Three generations in one frame',
--     'A candid they didn''t see coming',
--     'Your outfit of the day',
--     'The best corner of the venue'
--   ]
-- );
-- To change the list later: update events set prompts = array['...', '...'];
