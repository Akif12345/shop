create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'request_type') then
    create type request_type as enum ('pickup', 'repair', 'belt_order', 'setup');
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'request_status') then
    create type request_status as enum ('new', 'contacted', 'scheduled', 'completed', 'cancelled');
  end if;
end
$$;

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  request_type request_type not null,
  status request_status not null default 'new',
  customer_name text not null,
  phone text not null,
  email text,
  machine_brand text,
  machine_model text,
  belt_size text,
  quantity integer check (quantity is null or quantity > 0),
  issue_description text,
  location_details text,
  preferred_date date,
  preferred_time text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_service_requests_status on public.service_requests(status);
create index if not exists idx_service_requests_request_type on public.service_requests(request_type);
create index if not exists idx_service_requests_created_at on public.service_requests(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_service_requests_updated_at on public.service_requests;
create trigger trg_service_requests_updated_at
before update on public.service_requests
for each row
execute function public.set_updated_at();

alter table public.service_requests enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'service_requests'
      and policyname = 'deny_all_public'
  ) then
    create policy "deny_all_public"
    on public.service_requests
    for all
    to public
    using (false)
    with check (false);
  end if;
end
$$;
