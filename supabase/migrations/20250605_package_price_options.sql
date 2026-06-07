-- package_price_options: flexible pricing tiers per package
-- Run in Supabase → SQL Editor

create table if not exists public.package_price_options (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  label_ar text not null,
  label_he text,
  price_ar text not null,
  price_he text,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now()
);

create index if not exists idx_package_price_options_package_id
  on public.package_price_options(package_id);

create index if not exists idx_package_price_options_sort
  on public.package_price_options(package_id, sort_order);

alter table public.package_price_options enable row level security;

drop policy if exists "Public read price options of active packages" on public.package_price_options;
create policy "Public read price options of active packages"
  on public.package_price_options
  for select
  using (
    exists (
      select 1
      from public.packages
      where packages.id = package_price_options.package_id
        and packages.is_active = true
    )
  );

-- Optional: migrate existing single prices into one price option per package
insert into public.package_price_options (package_id, label_ar, label_he, price_ar, price_he, sort_order)
select
  p.id,
  'للشخص',
  'לאדם',
  p.price,
  p.price,
  0
from public.packages p
where coalesce(trim(p.price), '') <> ''
  and not exists (
    select 1 from public.package_price_options o where o.package_id = p.id
  );
