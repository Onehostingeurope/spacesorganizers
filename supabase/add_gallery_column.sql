ALTER TABLE services ADD COLUMN IF NOT EXISTS gallery text[] DEFAULT '{}'::text[];
