-- Add contact preferences field to patients table
ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS contact_preferences TEXT;
