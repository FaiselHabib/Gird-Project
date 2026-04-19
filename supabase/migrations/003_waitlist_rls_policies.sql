-- Fix: Add missing RLS policies for the waitlist table
-- Run this in Supabase SQL Editor → Run

-- Ensure RLS is on (idempotent)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- ── Anon: INSERT ──────────────────────────────────────────────────────────────
-- Allows anyone to join the waitlist
DROP POLICY IF EXISTS "anon_insert_waitlist" ON waitlist;
CREATE POLICY "anon_insert_waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ── Anon: SELECT ──────────────────────────────────────────────────────────────
-- Needed so .insert().select('position, referral_code') returns the new row
DROP POLICY IF EXISTS "anon_select_waitlist" ON waitlist;
CREATE POLICY "anon_select_waitlist"
  ON waitlist
  FOR SELECT
  TO anon
  USING (true);

-- ── Authenticated (admin): full access ────────────────────────────────────────
DROP POLICY IF EXISTS "authenticated_all_waitlist" ON waitlist;
CREATE POLICY "authenticated_all_waitlist"
  ON waitlist
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
