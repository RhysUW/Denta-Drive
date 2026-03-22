-- Add note fields to patients table
ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS my_notes       TEXT,
  ADD COLUMN IF NOT EXISTS previous_notes TEXT;