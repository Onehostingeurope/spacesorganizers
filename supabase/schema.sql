-- Spaces Organizers CMS Schema
-- Run this in: Supabase Dashboard → SQL Editor

-- SERVICES
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  lang text not null default 'en',
  title text not null,
  slug text not null,
  intro text,
  description text,
  included text[],
  "idealClient" text,
  outcome text,
  image text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now(),
  unique(slug, lang)
);

-- SPACES
create table if not exists spaces (
  id uuid primary key default gen_random_uuid(),
  lang text not null default 'en',
  title text not null,
  slug text not null,
  description text,
  pain text,
  solution text,
  image text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now(),
  unique(slug, lang)
);

-- PORTFOLIO
create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  lang text not null default 'en',
  title text not null,
  slug text not null,
  category text,
  description text,
  image text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now(),
  unique(slug, lang)
);

-- TESTIMONIALS
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  lang text not null default 'en',
  author text not null,
  area text,
  text text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

-- BLOG
create table if not exists blog (
  id uuid primary key default gen_random_uuid(),
  lang text not null default 'en',
  title text not null,
  slug text not null,
  category text,
  date text,
  excerpt text,
  content text,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now(),
  unique(slug, lang)
);

-- FAQ
create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  lang text not null default 'en',
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

-- HERO SETTINGS (per-language hero text + carousel appearance)
create table if not exists hero_settings (
  id uuid primary key default gen_random_uuid(),
  lang text unique not null,
  region text,
  title text,
  subtitle text,
  description text,
  autoplay_speed integer default 15,
  overlay_opacity integer default 40,
  overlay_style text default 'dark',
  updated_at timestamptz default now()
);
alter table hero_settings disable row level security;

-- HOMEPAGE SETTINGS (per-language content for all homepage sections)
create table if not exists homepage_settings (
  id uuid primary key default gen_random_uuid(),
  lang text unique not null,
  -- Philosophy section
  phi_label text, phi_heading text, phi_quote text,
  phi_pantry_title text, phi_pantry_desc text, phi_pantry_image text,
  phi_living_title text, phi_living_desc text, phi_living_image text,
  phi_wardrobe_title text, phi_wardrobe_desc text, phi_wardrobe_image text,
  -- Process section
  proc_label text, proc_heading text,
  proc_step1_title text, proc_step1_desc text,
  proc_step2_title text, proc_step2_desc text,
  proc_step3_title text, proc_step3_desc text,
  proc_step4_title text, proc_step4_desc text,
  -- Section headers
  testi_label text, testi_heading text,
  serv_label text, serv_heading text, serv_heading_accent text,
  spaces_label text, spaces_heading text,
  port_label text, port_heading text,
  faq_label text, faq_heading text,
  cta_label text, cta_heading text, cta_desc text,
  -- Contact / company info
  contact_heading text, contact_heading_accent text,
  contact_description text, contact_serving text,
  company_email text, company_phone text,
  updated_at timestamptz default now()
);
alter table homepage_settings disable row level security;
