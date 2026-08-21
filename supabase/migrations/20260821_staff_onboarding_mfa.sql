-- Run once after the original Launch 2.5 schema.
-- Creates staff profiles for invited users and requires verified TOTP (aal2)
-- for all private Vault records and files.

create or replace function public.handle_new_staff()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, active)
  values (new.id, 'staff', true)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_staff();

insert into public.profiles (id, role, active)
select id, 'staff', true from auth.users
on conflict (id) do nothing;

create or replace function public.is_staff_aal2()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select (select auth.jwt() ->> 'aal') = 'aal2'
    and exists (
      select 1 from public.profiles
      where id = auth.uid()
        and active
        and role in ('admin','staff')
    )
$$;

create or replace function public.is_admin_aal2()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select (select auth.jwt() ->> 'aal') = 'aal2'
    and exists (
      select 1 from public.profiles
      where id = auth.uid()
        and active
        and role = 'admin'
    )
$$;

drop policy if exists "profiles read" on public.profiles;
drop policy if exists "profiles admin" on public.profiles;
create policy "profiles read aal2" on public.profiles
for select to authenticated
using ((id = auth.uid() and (select auth.jwt() ->> 'aal') = 'aal2') or public.is_admin_aal2());
create policy "profiles admin aal2" on public.profiles
for all to authenticated
using (public.is_admin_aal2())
with check (public.is_admin_aal2());

drop policy if exists "projects staff" on public.projects;
drop policy if exists "decisions staff" on public.decisions;
drop policy if exists "documents staff" on public.documents;
drop policy if exists "templates read" on public.templates;
drop policy if exists "templates admin" on public.templates;
create policy "projects staff aal2" on public.projects for all to authenticated using(public.is_staff_aal2()) with check(public.is_staff_aal2());
create policy "decisions staff aal2" on public.decisions for all to authenticated using(public.is_staff_aal2()) with check(public.is_staff_aal2());
create policy "documents staff aal2" on public.documents for all to authenticated using(public.is_staff_aal2()) with check(public.is_staff_aal2());
create policy "templates read aal2" on public.templates for select to authenticated using(public.is_staff_aal2());
create policy "templates admin aal2" on public.templates for all to authenticated using(public.is_admin_aal2()) with check(public.is_admin_aal2());

drop policy if exists "vault read" on storage.objects;
drop policy if exists "vault add" on storage.objects;
drop policy if exists "vault delete" on storage.objects;
create policy "vault read aal2" on storage.objects for select to authenticated using(bucket_id='vault' and public.is_staff_aal2());
create policy "vault add aal2" on storage.objects for insert to authenticated with check(bucket_id='vault' and public.is_staff_aal2());
create policy "vault delete aal2" on storage.objects for delete to authenticated using(bucket_id='vault' and public.is_admin_aal2());
