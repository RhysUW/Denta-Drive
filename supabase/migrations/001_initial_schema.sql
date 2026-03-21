-- ============================================================
-- DentalTrack - Initial Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Users table (custom auth, not Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      TEXT UNIQUE NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name     TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  temp_number         TEXT UNIQUE,
  name                TEXT NOT NULL,
  age                 INTEGER CHECK (age >= 0 AND age <= 150),
  gender              TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  address             TEXT,
  contact             TEXT,
  health_conditions   TEXT[] DEFAULT '{}',
  current_medications TEXT[] DEFAULT '{}',
  remarks             TEXT,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- Auto-generate temp_number (PT-0001, PT-0002, ...)
CREATE SEQUENCE IF NOT EXISTS patient_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_temp_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.temp_number IS NULL OR NEW.temp_number = '' THEN
    NEW.temp_number := 'PT-' || LPAD(nextval('patient_number_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_temp_number
  BEFORE INSERT ON patients
  FOR EACH ROW
  EXECUTE FUNCTION generate_temp_number();

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id     UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  appointment_at TIMESTAMPTZ NOT NULL,
  duration_mins  INTEGER DEFAULT 60,
  notes          TEXT,
  is_completed   BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_at ON appointments(appointment_at);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);

-- Patient images table
CREATE TABLE IF NOT EXISTS patient_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id   UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  filename     TEXT NOT NULL,
  mime_type    TEXT,
  uploaded_at  TIMESTAMPTZ DEFAULT now()
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  target_count  INTEGER NOT NULL CHECK (target_count > 0),
  current_count INTEGER DEFAULT 0 CHECK (current_count >= 0),
  semester      TEXT NOT NULL,
  color         TEXT DEFAULT '#6366f1',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Deny direct access (server uses service_role which bypasses RLS)
CREATE POLICY "deny_direct_access" ON users FOR ALL USING (false);
CREATE POLICY "deny_direct_access" ON patients FOR ALL USING (false);
CREATE POLICY "deny_direct_access" ON appointments FOR ALL USING (false);
CREATE POLICY "deny_direct_access" ON patient_images FOR ALL USING (false);
CREATE POLICY "deny_direct_access" ON goals FOR ALL USING (false);
