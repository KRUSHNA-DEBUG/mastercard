-- Create profiles table that references auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null check (role in ('admin', 'volunteer', 'donor')) default 'donor',
  phone text,
  address text,
  avatar_url text,
  bio text,
  skills text[], -- for volunteers
  interests text[], -- for donors
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS policies for profiles
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Allow admins to view all profiles
create policy "profiles_select_admin"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'donor')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Update existing tables to reference profiles instead of users
alter table volunteers drop constraint if exists volunteers_user_id_fkey;
alter table volunteers add constraint volunteers_user_id_fkey 
  foreign key (user_id) references public.profiles(id) on delete cascade;

alter table donors drop constraint if exists donors_user_id_fkey;
alter table donors add constraint donors_user_id_fkey 
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- Enable RLS on other tables and add policies
alter table volunteers enable row level security;
alter table donors enable row level security;
alter table donations enable row level security;
alter table volunteer_applications enable row level security;
alter table event_registrations enable row level security;

-- Volunteer policies
create policy "volunteers_select_own" on volunteers for select using (auth.uid() = user_id);
create policy "volunteers_insert_own" on volunteers for insert with check (auth.uid() = user_id);
create policy "volunteers_update_own" on volunteers for update using (auth.uid() = user_id);

-- Donor policies  
create policy "donors_select_own" on donors for select using (auth.uid() = user_id);
create policy "donors_insert_own" on donors for insert with check (auth.uid() = user_id);
create policy "donors_update_own" on donors for update using (auth.uid() = user_id);

-- Donation policies
create policy "donations_select_own" on donations for select using (auth.uid() = donor_id);
create policy "donations_insert_own" on donations for insert with check (auth.uid() = donor_id);

-- Admin policies for all tables
create policy "volunteers_admin_all" on volunteers for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "donors_admin_all" on donors for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "donations_admin_all" on donations for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
