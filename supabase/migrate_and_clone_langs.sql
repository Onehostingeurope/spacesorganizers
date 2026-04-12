-- ============================================================
-- Spaces Organizers — Lang Migration + EN Clone to FR/RU/DE
-- Run this in: Supabase Dashboard → SQL Editor
-- Safe to run multiple times (idempotent)
-- ============================================================

-- STEP 1: Add lang column to all collection tables (if not already done)
ALTER TABLE services     ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE spaces       ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE portfolio    ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE blog         ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';
ALTER TABLE faq          ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'en';

-- STEP 2: Drop old single-column slug UNIQUE constraints (if they exist)
-- These block us from having the same slug in different languages
ALTER TABLE services  DROP CONSTRAINT IF EXISTS services_slug_key;
ALTER TABLE spaces    DROP CONSTRAINT IF EXISTS spaces_slug_key;
ALTER TABLE portfolio DROP CONSTRAINT IF EXISTS portfolio_slug_key;
ALTER TABLE blog      DROP CONSTRAINT IF EXISTS blog_slug_key;

-- STEP 3: Create composite UNIQUE indexes (slug + lang)
-- Now the same slug can exist in EN, FR, RU, DE separately
CREATE UNIQUE INDEX IF NOT EXISTS services_slug_lang_idx  ON services(slug, lang);
CREATE UNIQUE INDEX IF NOT EXISTS spaces_slug_lang_idx    ON spaces(slug, lang);
CREATE UNIQUE INDEX IF NOT EXISTS portfolio_slug_lang_idx ON portfolio(slug, lang);
CREATE UNIQUE INDEX IF NOT EXISTS blog_slug_lang_idx      ON blog(slug, lang);

-- ============================================================
-- STEP 4: Clone EN records → FR
-- ============================================================

INSERT INTO services (lang, title, slug, intro, description, included, "idealClient", outcome, image)
SELECT 'fr', title, slug, intro, description, included, "idealClient", outcome, image
FROM services WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO spaces (lang, title, slug, pain, solution, image)
SELECT 'fr', title, slug, pain, solution, image
FROM spaces WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO portfolio (lang, title, slug, category, description, image)
SELECT 'fr', title, slug, category, description, image
FROM portfolio WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO testimonials (lang, author, area, text)
SELECT 'fr', author, area, text
FROM testimonials WHERE lang = 'en'
ON CONFLICT DO NOTHING;

INSERT INTO blog (lang, title, slug, category, date, excerpt, content)
SELECT 'fr', title, slug, category, date, excerpt, content
FROM blog WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO faq (lang, question, answer)
SELECT 'fr', question, answer
FROM faq WHERE lang = 'en'
ON CONFLICT DO NOTHING;

-- ============================================================
-- STEP 5: Clone EN records → RU
-- ============================================================

INSERT INTO services (lang, title, slug, intro, description, included, "idealClient", outcome, image)
SELECT 'ru', title, slug, intro, description, included, "idealClient", outcome, image
FROM services WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO spaces (lang, title, slug, pain, solution, image)
SELECT 'ru', title, slug, pain, solution, image
FROM spaces WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO portfolio (lang, title, slug, category, description, image)
SELECT 'ru', title, slug, category, description, image
FROM portfolio WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO testimonials (lang, author, area, text)
SELECT 'ru', author, area, text
FROM testimonials WHERE lang = 'en'
ON CONFLICT DO NOTHING;

INSERT INTO blog (lang, title, slug, category, date, excerpt, content)
SELECT 'ru', title, slug, category, date, excerpt, content
FROM blog WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO faq (lang, question, answer)
SELECT 'ru', question, answer
FROM faq WHERE lang = 'en'
ON CONFLICT DO NOTHING;

-- ============================================================
-- STEP 6: Clone EN records → DE
-- ============================================================

INSERT INTO services (lang, title, slug, intro, description, included, "idealClient", outcome, image)
SELECT 'de', title, slug, intro, description, included, "idealClient", outcome, image
FROM services WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO spaces (lang, title, slug, pain, solution, image)
SELECT 'de', title, slug, pain, solution, image
FROM spaces WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO portfolio (lang, title, slug, category, description, image)
SELECT 'de', title, slug, category, description, image
FROM portfolio WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO testimonials (lang, author, area, text)
SELECT 'de', author, area, text
FROM testimonials WHERE lang = 'en'
ON CONFLICT DO NOTHING;

INSERT INTO blog (lang, title, slug, category, date, excerpt, content)
SELECT 'de', title, slug, category, date, excerpt, content
FROM blog WHERE lang = 'en'
ON CONFLICT (slug, lang) DO NOTHING;

INSERT INTO faq (lang, question, answer)
SELECT 'de', question, answer
FROM faq WHERE lang = 'en'
ON CONFLICT DO NOTHING;

-- ============================================================
-- Verify results
-- ============================================================
SELECT 'services'     AS tbl, lang, count(*) FROM services     GROUP BY lang ORDER BY tbl, lang;
SELECT 'spaces'       AS tbl, lang, count(*) FROM spaces       GROUP BY lang ORDER BY tbl, lang;
SELECT 'portfolio'    AS tbl, lang, count(*) FROM portfolio    GROUP BY lang ORDER BY tbl, lang;
SELECT 'testimonials' AS tbl, lang, count(*) FROM testimonials GROUP BY lang ORDER BY tbl, lang;
SELECT 'blog'         AS tbl, lang, count(*) FROM blog         GROUP BY lang ORDER BY tbl, lang;
SELECT 'faq'          AS tbl, lang, count(*) FROM faq          GROUP BY lang ORDER BY tbl, lang;
