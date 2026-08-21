-- شغّل هذا الملف مرة واحدة في Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('summary','ministry','question','exam','resource','experience')),
  title text not null,
  description text,
  subject_id text,
  division_id text,
  category text,
  source_name text,
  year integer,
  exam_round text,
  difficulty text,
  question_type text,
  body text,
  answer text,
  external_url text,
  file_path text,
  file_url text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select auth.uid() = '4b1c4449-8d7c-4e93-9f43-f919755bad6e'::uuid;
$$;

alter table public.content_items enable row level security;
drop policy if exists "Public reads published content" on public.content_items;
create policy "Public reads published content" on public.content_items for select
using (is_published = true or public.is_platform_admin());
drop policy if exists "Admin inserts content" on public.content_items;
create policy "Admin inserts content" on public.content_items for insert
with check (public.is_platform_admin() and created_by = auth.uid());
drop policy if exists "Admin updates content" on public.content_items;
create policy "Admin updates content" on public.content_items for update
using (public.is_platform_admin()) with check (public.is_platform_admin());
drop policy if exists "Admin deletes content" on public.content_items;
create policy "Admin deletes content" on public.content_items for delete
using (public.is_platform_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('content-files', 'content-files', true, 52428800, array['application/pdf','image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admin uploads content files" on storage.objects;
create policy "Admin uploads content files" on storage.objects for insert to authenticated
with check (bucket_id = 'content-files' and public.is_platform_admin());
drop policy if exists "Admin updates content files" on storage.objects;
create policy "Admin updates content files" on storage.objects for update to authenticated
using (bucket_id = 'content-files' and public.is_platform_admin());
drop policy if exists "Admin deletes content files" on storage.objects;
create policy "Admin deletes content files" on storage.objects for delete to authenticated
using (bucket_id = 'content-files' and public.is_platform_admin());

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists content_items_updated_at on public.content_items;
create trigger content_items_updated_at before update on public.content_items
for each row execute function public.set_updated_at();

grant execute on function public.is_platform_admin() to anon, authenticated;
