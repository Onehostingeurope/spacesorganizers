-- Spaces Organizers CMS Schema
-- Run this in: Supabase Dashboard → SQL Editor

-- SERVICES
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  intro text,
  description text,
  included text[],
  "idealClient" text,
  outcome text,
  image text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- SPACES
create table if not exists spaces (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  pain text,
  solution text,
  image text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- PORTFOLIO
create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text,
  description text,
  image text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- TESTIMONIALS
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  area text,
  text text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- BLOG
create table if not exists blog (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text,
  date text,
  excerpt text,
  content text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- FAQ
create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- LEADS
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  service text,
  message text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- Disable RLS for all tables (internal CMS, no user auth needed)
alter table services disable row level security;
alter table spaces disable row level security;
alter table portfolio disable row level security;
alter table testimonials disable row level security;
alter table blog disable row level security;
alter table faq disable row level security;
alter table leads disable row level security;

-- HERO
create table if not exists hero (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  url text not null,
  alt text,
  "order" integer default 1,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);
alter table hero disable row level security;
