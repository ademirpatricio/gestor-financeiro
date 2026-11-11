-- Painel admin do Grana
-- Rode este arquivo inteiro no SQL Editor do Supabase.

-- 1) Função que devolve a lista de usuários.
--    Só quem tem role "admin" no app_metadata consegue chamar.
drop function if exists public.admin_users();

create function public.admin_users()
returns table (
  id uuid,
  name text,
  email text,
  created_at timestamptz,
  last_sign_in_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') <> 'admin' then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  return query
  select
    u.id,
    (u.raw_user_meta_data ->> 'name')::text,
    u.email::text,
    u.created_at,
    u.last_sign_in_at
  from auth.users u
  order by u.created_at desc;
end;
$$;

revoke execute on function public.admin_users() from public, anon;
grant execute on function public.admin_users() to authenticated;

-- 2) Marca a sua conta como admin.
--    Troque SEU_EMAIL_AQUI pelo e-mail da sua conta no Grana.
--    Depois, saia e entre de novo no app para o login carregar a permissão.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'SEU_EMAIL_AQUI';
