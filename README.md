# DentalTrack — Dental Student Client Tracking

A web app for dental students to manage patient records, appointments, and clinical procedure goals.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)

---

## Quick Start

### 1. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/migrations/001_initial_schema.sql`
3. Go to **Storage → New bucket**, create a bucket named `patient-images`:
   - Public: **No** (private)
   - File size limit: 10 MB
   - Allowed MIME types: `image/jpeg, image/png, image/webp`
4. Note your **Project URL**, **anon key**, and **service_role key** from Settings → API

### 2. Configure the Server

```bash
cd server
cp .env.example .env
```

Edit `.env`:
```
PORT=3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=change-this-to-a-long-random-string
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

Install dependencies and start:
```bash
npm install
npm run dev
```

### 3. Configure the Client

```bash
cd client
cp .env.example .env
```

Edit `.env`:
```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Install dependencies and start:
```bash
npm install
npm run dev
```

App runs at **http://localhost:5173**

---

## Features

| Feature | Description |
|---------|-------------|
| **Auth** | Register/login with JWT. Passwords hashed with bcrypt. |
| **Patients** | Full patient records with health info, medications, images. Auto-assigned PT-XXXX IDs. |
| **Patient List** | Searchable, paginated table. Click any row to open full record. |
| **Calendar** | FullCalendar week/month view. Drag-to-reschedule. |
| **View in Calendar** | Deep-link from patient record — navigates to & highlights next appointment. |
| **Goals** | Per-semester procedure tracking with progress bars, colour accents, +/- counters. |
| **Images** | Secure upload to Supabase Storage via signed URLs. |

---

## Project Structure

```
dental-software/
├── client/          # React frontend (Vite)
├── server/          # Express API
└── supabase/        # SQL migrations
    └── migrations/
        └── 001_initial_schema.sql
```
