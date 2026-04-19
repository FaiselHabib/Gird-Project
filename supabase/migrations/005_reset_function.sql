-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 005: Create / replace reset_prelaunch_data() function
--
-- Run this in: Supabase Dashboard → SQL Editor → Run
--
-- Safe to re-run. Does NOT touch app_config table or any other schema.
-- ─────────────────────────────────────────────────────────────────────────────

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

  -- ── 1. Clear all waitlist entries ─────────────────────────────────────────
  DELETE FROM waitlist;

  -- ── 2. Reset the position serial sequence back to 1 ──────────────────────
  --   pg_get_serial_sequence returns NULL if the column has no owned sequence
  --   (e.g. added as a plain integer), so the IF guard is required.
  SELECT pg_get_serial_sequence('public.waitlist', 'position') INTO seq_name;
  IF seq_name IS NOT NULL THEN
    EXECUTE format('ALTER SEQUENCE %s RESTART WITH 1', seq_name);
  END IF;

  -- ── 3. Clear announcement history (only if the table exists) ─────────────
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'announcements'
  ) THEN
    DELETE FROM announcements;
  END IF;

END;
$$;

GRANT EXECUTE ON FUNCTION reset_prelaunch_data() TO authenticated;
