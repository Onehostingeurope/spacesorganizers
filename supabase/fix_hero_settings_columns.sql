ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS overlay_opacity integer DEFAULT 40;
ALTER TABLE hero_settings ADD COLUMN IF NOT EXISTS overlay_style text DEFAULT 'dark';
