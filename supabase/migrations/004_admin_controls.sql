-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 004: Admin controls — app_config table + reset function
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. app_config table ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS app_config (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- ── 2. RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

-- Anon can read (landing page reads launch_progress)
DROP POLICY IF EXISTS "anon_select_app_config" ON app_config;
CREATE POLICY "anon_select_app_config"
  ON app_config FOR SELECT TO anon
  USING (true);

-- Authenticated (admin) can read + write everything
DROP POLICY IF EXISTS "authenticated_all_app_config" ON app_config;
CREATE POLICY "authenticated_all_app_config"
  ON app_config FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── 3. Seed default launch progress ──────────────────────────────────────────
INSERT INTO app_config (key, value)
VALUES (
  'launch_progress',
  '{"visible":true,"title":"🚀 قرد قادم قريبًا","subtitle":"نقترب من الإطلاق الرسمي","percentage":60}'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- ── 4. Reset function (SECURITY DEFINER — runs elevated, auth-gated) ─────────
CREATE OR REPLACE FUNCTION reset_prelaunch_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  seq_name text;
BEGIN
  -- Only authenticated admin users may call this
  IF auth.role() != 'authenticated' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Clear all waitlist entries
  DELETE FROM waitlist;

  -- Reset the position serial sequence back to 1
  SELECT pg_get_serial_sequence('public.waitlist', 'position') INTO seq_name;
  IF seq_name IS NOT NULL THEN
    EXECUTE format('ALTER SEQUENCE %s RESTART WITH 1', seq_name);
  END IF;

  -- Clear announcement history (only if the table exists)
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'announcements'
  ) THEN
    DELETE FROM announcements;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION reset_prelaunch_data() TO authenticated;
