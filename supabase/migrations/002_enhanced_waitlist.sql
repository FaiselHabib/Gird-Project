-- Enhanced waitlist table: city, user type, sport, referrals, position
-- Run this in Supabase SQL Editor

-- New columns
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS user_type text DEFAULT 'player';
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS preferred_sport text DEFAULT 'padel';
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referral_code text UNIQUE;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referred_by text;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS position serial;

-- Index for referral lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist (referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist (referred_by);
CREATE INDEX IF NOT EXISTS idx_waitlist_user_type ON waitlist (user_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_city ON waitlist (city);

-- Update RLS: allow anon to insert all new fields
-- (existing INSERT policy should cover this, but ensure columns are allowed)
-- The existing policy grants INSERT to anon — no change needed for new columns.
