-- Migration: Add lang column to all CMS collection tables
-- Run this in: Supabase Dashboard → SQL Editor

ALTER TABLE services     ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE spaces       ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE portfolio    ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE blog         ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE faq          ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';

-- Drop old unique-only-on-slug constraints (they no longer apply)
-- and add composite unique constraints (slug + lang)
-- NOTE: Only run these DROP lines if you get a constraint conflict error:
-- ALTER TABLE services     DROP CONSTRAINT IF EXISTS services_slug_key;
-- ALTER TABLE spaces       DROP CONSTRAINT IF EXISTS spaces_slug_key;
-- ALTER TABLE portfolio    DROP CONSTRAINT IF EXISTS portfolio_slug_key;
-- ALTER TABLE blog         DROP CONSTRAINT IF EXISTS blog_slug_key;

-- Create composite unique indexes (safe to run multiple times)
CREATE UNIQUE INDEX IF NOT EXISTS services_slug_lang_idx     ON services(slug, lang);
CREATE UNIQUE INDEX IF NOT EXISTS spaces_slug_lang_idx       ON spaces(slug, lang);
CREATE UNIQUE INDEX IF NOT EXISTS portfolio_slug_lang_idx    ON portfolio(slug, lang);
CREATE UNIQUE INDEX IF NOT EXISTS blog_slug_lang_idx         ON blog(slug, lang);
