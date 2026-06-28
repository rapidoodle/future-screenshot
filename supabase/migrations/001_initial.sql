-- Future Screenshot Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  is_pro boolean default false not null,
  generations_today integer default 0 not null
);

-- Generations table
create table if not exists public.generations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  goal text not null,
  category text not null check (category in ('Money','Fitness','Career','Business','Creator','Relationship','Custom')),
  timeframe text not null check (timeframe in ('3 months','6 months','1 year','3 years','5 years')),
  tone text not null check (tone in ('Realistic','Funny','Dramatic','Luxury','Motivational')),
  current_situation text,
  generated_content jsonb not null,
  created_at timestamptz default now() not null
);

-- Indexes
create index if not exists generations_user_id_idx on public.generations(user_id);
create index if not exists generations_created_at_idx on public.generations(created_at desc);
create index if not exists generations_category_idx on public.generations(category);

-- RLS Policies
alter table public.generations enable row level security;
alter table public.users enable row level security;

-- Anyone can insert a generation (anonymous or signed in)
create policy "Anyone can insert generations"
  on public.generations for insert
  with check (true);

-- Anyone can read their own generations (by user_id or null)
create policy "Users can read own generations"
  on public.generations for select
  using (user_id = auth.uid() or user_id is null);

-- Users can read their own profile
create policy "Users can read own profile"
  on public.users for select
  using (id = auth.uid());

-- Users can update their own profile
create policy "Users can update own profile"
  on public.users for update
  using (id = auth.uid());

-- Auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
