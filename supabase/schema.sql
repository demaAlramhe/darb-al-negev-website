-- ============================================================
-- Darb Al Negev — Supabase schema for admin panel
-- Paste this entire file into: Supabase → SQL Editor → Run
-- ============================================================

create extension if not exists "pgcrypto";

-- ── 1. packages ──────────────────────────────────────────────

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  title_ar text not null,
  title_he text,
  destination_ar text,
  destination_he text,
  description_ar text,
  description_he text,
  includes_ar text,
  includes_he text,
  notes_ar text,
  notes_he text,
  price text,
  travel_date text,
  duration_ar text,
  duration_he text,
  badge text,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- ── 2. package_images ────────────────────────────────────────

create table if not exists public.package_images (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  image_url text not null,
  cloudinary_public_id text not null,
  created_at timestamp with time zone not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────

create index if not exists idx_packages_is_active
  on public.packages(is_active);

create index if not exists idx_packages_created_at
  on public.packages(created_at desc);

create index if not exists idx_package_images_package_id
  on public.package_images(package_id);

-- ── updated_at trigger for packages ──────────────────────────

create or replace function public.set_packages_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_packages_updated_at on public.packages;

create trigger trg_packages_updated_at
  before update on public.packages
  for each row
  execute function public.set_packages_updated_at();

-- ── Row Level Security (public website read-only) ────────────
-- Admin writes use SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).

alter table public.packages enable row level security;
alter table public.package_images enable row level security;

drop policy if exists "Public read active packages" on public.packages;
create policy "Public read active packages"
  on public.packages
  for select
  using (is_active = true);

drop policy if exists "Public read images of active packages" on public.package_images;
create policy "Public read images of active packages"
  on public.package_images
  for select
  using (
    exists (
      select 1
      from public.packages
      where packages.id = package_images.package_id
        and packages.is_active = true
    )
  );
