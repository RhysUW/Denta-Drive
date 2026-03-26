# DentalTrack — Dental Student Client Tracking

A web app for dental students to manage patient records, appointments, and clinical procedure goals.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)

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
