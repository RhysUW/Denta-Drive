-- Add date_of_birth column to patients table
ALTER TABLE patients ADD COLUMN IF NOT EXISTS date_of_birth DATE;