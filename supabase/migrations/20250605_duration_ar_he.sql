-- Split shared duration into language-specific columns
-- Run in Supabase → SQL Editor if your database already has a duration column.

alter table public.packages
  add column if not exists duration_ar text,
  add column if not exists duration_he text;

-- Copy existing shared duration into Arabic (manual Hebrew translation may still be needed)
update public.packages
set duration_ar = duration
where duration is not null
  and duration <> ''
  and (duration_ar is null or duration_ar = '');

alter table public.packages drop column if exists duration;
