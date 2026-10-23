-- Création des tables du livre d'or
create table public.messages (
  id bigint generated always as identity primary key,
  pseudo text not null,
  contenu text not null,
  created_at timestamptz not null default now()
);

create table public.inscrits (
  id bigint generated always as identity primary key,
  prenom text not null,
  nom text not null,
  email text not null,
  telephone text,
  adresse text,
  created_at timestamptz not null default now()
);

alter table public.messages disable row level security;
alter table public.inscrits disable row level security;
grant select, insert, update, delete on public.messages to anon, authenticated;
grant select, insert, update, delete on public.inscrits to anon, authenticated;
