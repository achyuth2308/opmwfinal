# OPMW — One Place Multi Work

**India's integrated enterprise operations platform** delivering BPO, IT, and HRMS services under one brand.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup (Laravel)](#backend-setup-laravel)
- [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
- [Running the Project](#running-the-project)
- [Admin Panel](#admin-panel)
- [API Endpoints](#api-endpoints)
- [Default Credentials](#default-credentials)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

OPMW is a full-stack web application with:

- **Public Website** — Home, Services (BPO, IT & Web, HRMS), Projects, About, Careers, Contact, Privacy & Terms pages.
- **Candidate Portal** — Registered users can apply for jobs, track their applications, and manage their profile.
- **Admin Panel** — Admins can view dashboard stats, manage applications (update status), view candidates, and read contact form submissions.

---

## Tech Stack

### Frontend (`opmw4/`)
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| React Router DOM 7 | Client-side routing |
| Framer Motion | Animations |
| Lucide React | Icons |
| Axios | HTTP client |
| Tailwind CSS 3 | Utility CSS |

### Backend (`opmw-backend/`)
| Technology | Purpose |
|---|---|
| Laravel 11 | PHP API framework |
| Laravel Sanctum | API token authentication |
| MySQL | Database |
| Laravel Mail | Email notifications |

---

## Project Structure

```
opmwfinal/
├── opmw4/                          # Frontend (React + Vite)
│   ├── public/                     # Static assets, images, videos
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/               # ProtectedRoute
│   │   │   ├── careers/            # RoleCard, ApplyForm
│   │   │   ├── contact/            # BranchCard, ContactForm
│   │   │   ├── home/               # Hero, Stats, Divisions, etc.
│   │   │   ├── projects/           # FilterBar, ProjectCard
│   │   │   ├── services/           # Service page components
│   │   │   └── shared/             # OPMWLogo, GlassCard, ScrollToTop, etc.
│   │   ├── constants/              # Static data (careers, navigation, etc.)
│   │   ├── context/                # AuthContext (React Context)
│   │   ├── hooks/                  # useFormSubmit, useScrollReveal, etc.
│   │   ├── intro/                  # Intro animation sequence
│   │   ├── layout/                 # Navbar, Footer, RootLayout
│   │   ├── pages/
│   │   │   ├── admin/              # AdminLogin, AdminDashboard, etc.
│   │   │   ├── auth/               # Login, Register, ForgotPassword, ResetPassword
│   │   │   ├── portal/             # Dashboard, MyApplications, Profile
│   │   │   ├── services/           # BPOServices, ITWeb, HRMS
│   │   │   ├── Home.jsx, About.jsx, Careers.jsx, Contact.jsx, etc.
│   │   ├── routes/                 # AppRouter
│   │   ├── services/               # API client, admin/careers/contact services
│   │   └── styles/                 # globals.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── opmw-backend/                   # Backend (Laravel)
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   │   ├── Admin/          # AdminAuthController, AdminDashboardController, etc.
    │   │   │   ├── AuthController.php
    │   │   │   ├── ApplicationController.php
    │   │   │   ├── ContactController.php
    │   │   │   └── ProfileController.php
    │   │   ├── Middleware/         # Admin middleware
    │   │   └── Requests/           # Form request validation
    │   ├── Mail/                   # Email templates (Mailable classes)
    │   └── Models/                 # User, Admin, Application, Contact
    ├── bootstrap/                  # app.php (middleware config)
    ├── config/                     # cors.php
    ├── database/
    │   ├── migrations/             # Database schema migrations
    │   └── seeders/                # AdminSeeder, DatabaseSeeder
    ├── resources/views/emails/     # Blade email templates
    ├── routes/                     # api.php (all API routes)
    └── .env.example
```

---

## Prerequisites

Make sure you have the following installed:

- **PHP** ≥ 8.2
- **Composer** (PHP dependency manager)
- **MySQL** ≥ 5.7 (or MariaDB ≥ 10.3)
- **Node.js** ≥ 18 (with npm)
- **Git**

---

## Backend Setup (Laravel)

### 1. Create a new Laravel project

Since the backend directory contains only the application source code, you need to create a fresh Laravel project and copy these files into it:

```bash
# Create a fresh Laravel 11 project
composer create-project laravel/laravel opmw-api

# Copy the backend source files into the Laravel project
# Copy these directories from opmw-backend/ into opmw-api/:
#   app/       → opmw-api/app/
#   bootstrap/ → opmw-api/bootstrap/
#   config/    → opmw-api/config/  (just cors.php)
#   database/  → opmw-api/database/
#   resources/ → opmw-api/resources/
#   routes/    → opmw-api/routes/  (just api.php)
```

### 2. Install dependencies

```bash
cd opmw-api
composer install
composer require laravel/sanctum
```

### 3. Configure environment

```bash
# Copy the example env file
copy .env.example .env

# Generate app key
php artisan key:generate
```

Edit the `.env` file with your database and mail credentials:

```env
APP_NAME=OPMW
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=opmw
DB_USERNAME=root
DB_PASSWORD=your_password_here

MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@opmw.in
MAIL_FROM_NAME="OPMW"

SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### 4. Create the database

```sql
CREATE DATABASE opmw CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run migrations and seed

```bash
php artisan migrate
php artisan db:seed
```

This will create all tables and seed the default admin account.

### 6. Create storage link

```bash
php artisan storage:link
```

### 7. Start the backend server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`.

---

## Frontend Setup (React + Vite)

### 1. Install dependencies

```bash
cd opmw4
npm install
```

### 2. Configure environment

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Start the dev server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## Running the Project

You need **two terminal windows** to run both servers simultaneously:

### Terminal 1 — Backend
```bash
cd opmw-backend      # (or wherever your Laravel project is)
php artisan serve
# → http://localhost:8000
```

### Terminal 2 — Frontend
```bash
cd opmw4
npm run dev
# → http://localhost:5173
```

### Production Build (Frontend)
```bash
cd opmw4
npm run build
# Output will be in opmw4/dist/
```

---

## Admin Panel

Access the admin panel at: **http://localhost:5173/admin/login**

### Admin Features
- **Dashboard** — Overview stats (total users, applications, pending, unread contacts), status breakdown chart, recent applications.
- **Applications** — Search, filter by status, paginate, and update application status with admin notes. Status email notifications are sent to applicants.
- **Candidates** — View all registered users with their application counts.
- **Contacts** — View all contact form submissions with full message detail.

---

## Default Credentials

### Admin Account
| Field | Value |
|---|---|
| Email | `admin@opmw.in` |
| Password | `admin@opmw2024` |

> ⚠️ **Change this password immediately after first login in production.**

---

## API Endpoints

### Public Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register a new candidate |
| POST | `/api/login` | Candidate login |
| POST | `/api/forgot-password` | Request password reset email |
| POST | `/api/reset-password` | Reset password with token |
| POST | `/api/apply` | Submit a job application |
| POST | `/api/contact` | Submit contact form |

### Authenticated Candidate Routes (requires Bearer token)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/logout` | Logout (revoke token) |
| GET | `/api/applications` | List user's applications |
| GET | `/api/applications/{id}` | View single application |
| GET | `/api/profile` | Get profile |
| PUT | `/api/profile` | Update profile (name, phone, city) |
| POST | `/api/profile/photo` | Upload profile photo |
| POST | `/api/profile/resume` | Upload resume (PDF) |
| PATCH | `/api/profile/password` | Change password |
| GET | `/api/notifications` | List notifications |

### Admin Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/dashboard` | Dashboard statistics |
| GET | `/api/admin/applications` | List all applications (paginated, filterable) |
| GET | `/api/admin/applications/{id}` | View application detail |
| PATCH | `/api/admin/applications/{id}/status` | Update application status |
| GET | `/api/admin/candidates` | List all candidates (paginated, searchable) |
| GET | `/api/admin/candidates/{id}` | View candidate detail |
| GET | `/api/admin/contacts` | List all contact submissions |

---

## Environment Variables

### Backend (`.env`)
| Variable | Description | Default |
|---|---|---|
| `APP_NAME` | Application name | `OPMW` |
| `APP_URL` | Backend URL | `http://localhost:8000` |
| `FRONTEND_URL` | Frontend URL (for CORS) | `http://localhost:5173` |
| `DB_CONNECTION` | Database driver | `mysql` |
| `DB_DATABASE` | Database name | `opmw` |
| `DB_USERNAME` | Database user | `root` |
| `DB_PASSWORD` | Database password | — |
| `MAIL_MAILER` | Mail driver | `smtp` |
| `MAIL_HOST` | SMTP host | — |
| `MAIL_PORT` | SMTP port | `1025` |
| `MAIL_FROM_ADDRESS` | Sender email | `noreply@opmw.in` |
| `SANCTUM_STATEFUL_DOMAINS` | Sanctum SPA domains | `localhost:5173` |

### Frontend (`.env`)
| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

---

## Database Schema

### `users`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT | Primary key |
| name | VARCHAR(255) | Required |
| email | VARCHAR(255) | Unique |
| phone | VARCHAR(255) | Nullable |
| city | VARCHAR(255) | Nullable |
| profile_photo | VARCHAR(255) | Nullable, stored in `public` disk |
| resume_path | VARCHAR(255) | Nullable, stored in `local` disk |
| password | VARCHAR(255) | Hashed |
| email_verified_at | TIMESTAMP | Nullable |
| timestamps | | created_at, updated_at |

### `admins`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT | Primary key |
| name | VARCHAR(255) | Required |
| email | VARCHAR(255) | Unique |
| password | VARCHAR(255) | Hashed |
| timestamps | | created_at, updated_at |

### `applications`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT | Primary key |
| user_id | BIGINT | Nullable FK → users |
| applicant_name | VARCHAR(255) | Required |
| applicant_email | VARCHAR(255) | Required |
| applicant_phone | VARCHAR(255) | Nullable |
| role | VARCHAR(255) | Job role applied for |
| location | VARCHAR(255) | Preferred location |
| resume_path | VARCHAR(255) | Nullable |
| cover_note | TEXT | Nullable |
| status | ENUM | Pending, Reviewed, Shortlisted, Rejected, Selected |
| admin_notes | TEXT | Nullable |
| timestamps | | created_at, updated_at |

### `contacts`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT | Primary key |
| name | VARCHAR(255) | Required |
| email | VARCHAR(255) | Required |
| subject | VARCHAR(255) | Required |
| message | TEXT | Required |
| is_read | BOOLEAN | Default: false |
| timestamps | | created_at, updated_at |

---

## Frontend Pages

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/about` | About Us | No |
| `/projects` | Projects Portfolio | No |
| `/careers` | Careers & Job Listings | No |
| `/contact` | Contact Us | No |
| `/privacy` | Privacy Policy | No |
| `/terms` | Terms & Conditions | No |
| `/services/bpo` | BPO Services | No |
| `/services/it-web` | IT & Web Services | No |
| `/services/hrms` | HRMS Product | No |
| `/login` | Candidate Login | No |
| `/register` | Candidate Registration | No |
| `/forgot-password` | Password Reset Request | No |
| `/reset-password` | Set New Password | No |
| `/portal` | Candidate Dashboard | Yes (Candidate) |
| `/portal/applications` | My Applications | Yes (Candidate) |
| `/portal/profile` | My Profile | Yes (Candidate) |
| `/admin/login` | Admin Login | No |
| `/admin` | Admin Dashboard | Yes (Admin) |
| `/admin/applications` | Manage Applications | Yes (Admin) |
| `/admin/candidates` | View Candidates | Yes (Admin) |
| `/admin/contacts` | View Contact Messages | Yes (Admin) |

---

## Troubleshooting

### CORS Errors
Make sure `FRONTEND_URL` in the backend `.env` matches your frontend URL exactly (including port). The CORS config is in `config/cors.php`.

### 401 Unauthorized
- Check that `SANCTUM_STATEFUL_DOMAINS` includes your frontend domain.
- Ensure the bearer token is being sent correctly in the `Authorization` header.
- The candidate and admin authentication use **separate tokens** stored in different localStorage keys.

### Mail Not Sending
- Mail failures are caught silently (won't break the app).
- For local development, use [Mailpit](https://mailpit.axllent.org/) or [Mailtrap](https://mailtrap.io/).
- Check your SMTP credentials in `.env`.

### Database Errors
```bash
php artisan migrate:fresh --seed    # Reset & reseed (DESTROYS ALL DATA)
php artisan migrate:status          # Check migration status
```

### Frontend Not Loading
```bash
cd opmw4
rm -rf node_modules
npm install
npm run dev
```

---

## License

© 2024 OPMW — One Place Multi Work. All rights reserved.
