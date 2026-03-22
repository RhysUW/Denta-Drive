-- ============================================================
-- Templates table
-- Run this in the Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS templates (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  content    TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_direct_access" ON templates FOR ALL USING (false);