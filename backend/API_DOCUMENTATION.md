# DevAdmin REST API Architecture & Developer Specification

Welcome to the **DevAdmin Multi-Site Portfolio Management REST API** specification. This document provides a complete technical guide to the backend architecture, service layer design, query optimization standards, and endpoint contracts.

---

## 🏛️ System Architecture & Service Layer

```
                ┌──────────────────────────────────────────────┐
                │          React 18 Frontend (Vite)            │
                │        (frontend/src/services/api.js)        │
                └──────────────────────┬───────────────────────┘
                                       │ HTTP / REST / JSON (JWT Bearer)
                                       ▼
                ┌──────────────────────────────────────────────┐
                │    Django REST Framework Ingress Layer       │
                │  - drf-spectacular (OpenAPI 3.0 / Swagger)   │
                │  - JWT Bearer Authentication (SimpleJWT)     │
                │  - CORS Dynamic Origin Parsing & Headers     │
                │  - Anon & User Rate Throttling Middleware    │
                └──────────────────────┬───────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Reusable Service Layer Architecture                   │
│                                                                             │
│  ┌─────────────────────────┐  ┌───────────────────────┐  ┌───────────────┐  │
│  │ MultiTenantQueryService │  │  NotificationService  │  │AnalyticsServic│  │
│  │ - ?website=slug scoping │  │  - SMTP Email Relay   │  │- Single-pass  │  │
│  │ - Category/Status filter│  │  - Auto-Read & Reply  │  │  aggregations │  │
│  │ - Visibility Toggling   │  │  - Delivery Logging   │  │- Heatmap Gen  │  │
│  └─────────────────────────┘  └───────────────────────┘  └───────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 Domain App Layer (Zero Boilerplate ViewSets)                │
│   Websites │ Projects │ Blogs │ Experiences │ Skills │ FAQs │ Profiles      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│       Database Layer (MySQL / SQLite Dual Mode with Composite Indexes)       │
│  - idx_proj_site_status / idx_proj_site_cat / idx_proj_site_vis             │
│  - idx_blog_site_status / idx_blog_site_cat / idx_blog_site_vis             │
│  - idx_exp_site_status / idx_exp_site_cat / idx_exp_site_vis                │
│  - idx_msg_site_read / idx_msg_site_tag / idx_msg_site_starred              │
│  - idx_faq_site_cat / idx_faq_site_vis                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 Interactive API Documentation Endpoints

| Resource | Path | Description |
|---|---|---|
| **Swagger UI** | `GET /api/docs/` | Interactive Swagger UI console with executable API testing |
| **ReDoc** | `GET /api/redoc/` | Clean, searchable technical API reference |
| **OpenAPI 3.0 Schema** | `GET /api/schema/` | Raw OpenAPI 3.0 YAML/JSON specification schema |
| **System Health Probe** | `GET /api/health/` | Real-time database connectivity and server latency check |

---

## 🔐 Authentication & Session Management

All authenticated endpoints require standard JSON headers and JWT Bearer tokens:

```http
Content-Type: application/json
Authorization: Bearer <access_token>
```

### 1. Obtain JWT Token Pair
- **Endpoint**: `POST /api/auth/token/`
- **Payload**:
  ```json
  {
    "username": "admin",
    "password": "your_password"
  }
  ```
- **Response** `200 OK`:
  ```json
  {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 2. Refresh Expired Access Token
- **Endpoint**: `POST /api/auth/token/refresh/`
- **Payload**: `{ "refresh": "<refresh_token>" }`
- **Response** `200 OK`: `{ "access": "<new_access_token>" }`

### 3. Current User Profile Session
- **Endpoint**: `GET /api/auth/me/`
- **Response** `200 OK`:
  ```json
  {
    "id": 1,
    "username": "admin",
    "email": "admin@devadmin.io",
    "first_name": "Roshan",
    "last_name": "Kumar",
    "role": "Super User",
    "is_staff": true,
    "is_superuser": true
  }
  ```

### 4. Change Account Password
- **Endpoint**: `POST /api/auth/change-password/`
- **Payload**:
  ```json
  {
    "old_password": "current_password",
    "new_password": "new_secure_password"
  }
  ```

### 5. Register Admin User
- **Endpoint**: `POST /api/auth/register/`
- **Payload**:
  ```json
  {
    "username": "newadmin",
    "email": "newadmin@example.com",
    "first_name": "Alex",
    "last_name": "Morgan",
    "password": "SecurePassword123!"
  }
  ```

---

## 🌐 API Modules & Endpoints Reference

### 1. 🏢 Multi-Tenant Websites (`/api/websites/`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/websites/` | List all configured portfolio websites (`dev-meet`, `dev-mitra`, `dev-mate`) |
| `POST` | `/api/websites/` | Register a new portfolio website |
| `GET` | `/api/websites/<slug>/` | Retrieve website configuration details |
| `PUT` | `/api/websites/<slug>/` | Update website settings and branding |

---

### 2. 📂 Projects Management (`/api/projects/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/projects/` | `?website=dev-meet&category=Web+Application&visible=true` | Filter projects by site and category |
| `POST` | `/api/projects/` | — | Create new project with rich Markdown & diagrams |
| `GET` | `/api/projects/<id>/` | — | Retrieve single project |
| `PUT` / `PATCH` | `/api/projects/<id>/` | — | Update project details |
| `DELETE` | `/api/projects/<id>/` | — | Remove project |
| `POST` | `/api/projects/<id>/toggle_visibility/` | — | Toggle visible status on portfolio |

**Sample Project Payload (`POST /api/projects/`)**:
```json
{
  "title": "Dev-Meet Video Conference Suite",
  "slug": "dev-meet-video-conference-suite",
  "category": "Web Application",
  "status": "LIVE",
  "completed_date": "2025-05-15",
  "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
  "demo_url": "https://devmeet.live",
  "github_url": "https://github.com/roshan-dev/dev-meet",
  "description": "## High Performance WebRTC Suite\n\n```architecture\nBrowser -> SFU -> Redis\n```",
  "visible": true,
  "website": "dev-meet"
}
```

---

### 3. ✍️ Technical Blog Posts (`/api/blogs/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/blogs/` | `?website=dev-meet&category=Architecture&status=PUBLISHED` | Filter articles by site, status, category |
| `POST` | `/api/blogs/` | — | Create new technical blog post |
| `GET` | `/api/blogs/<id>/` | — | Retrieve single blog post |
| `PUT` / `PATCH` | `/api/blogs/<id>/` | — | Update blog post |
| `DELETE` | `/api/blogs/<id>/` | — | Delete blog post |
| `POST` | `/api/blogs/<id>/toggle_visibility/` | — | Toggle public visibility |

---

### 4. 💼 Career Experiences (`/api/experiences/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/experiences/` | `?website=dev-meet&status=CURRENT` | List work milestones |
| `POST` | `/api/experiences/` | — | Create new career experience |
| `PUT` / `PATCH` | `/api/experiences/<id>/` | — | Update experience |
| `DELETE` | `/api/experiences/<id>/` | — | Delete experience |
| `POST` | `/api/experiences/<id>/toggle_visibility/` | — | Toggle portfolio visibility |

---

### 5. ⚡ Technical Skills (`/api/skills/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/skills/` | `?website=dev-meet&category=Frontend` | List skills and proficiency |
| `POST` | `/api/skills/` | — | Add skill record |
| `PUT` / `PATCH` | `/api/skills/<id>/` | — | Update skill |
| `DELETE` | `/api/skills/<id>/` | — | Delete skill |
| `POST` | `/api/skills/<id>/toggle_visibility/` | — | Toggle portfolio visibility |

---

### 6. ❓ Frequently Asked Questions (`/api/faqs/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/faqs/` | `?website=dev-meet&category=Services` | List FAQs |
| `POST` | `/api/faqs/` | — | Create FAQ question & answer |
| `PUT` / `PATCH` | `/api/faqs/<id>/` | — | Update FAQ |
| `DELETE` | `/api/faqs/<id>/` | — | Delete FAQ |
| `POST` | `/api/faqs/<id>/toggle_visibility/` | — | Toggle visibility |

---

### 7. 📬 Contact Inquiries & SMTP Reply Relay (`/api/contacts/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/contacts/` | `?website=dev-meet&unread=true&starred=true` | List incoming inquiries (Authenticated) |
| `POST` | `/api/contacts/` | — | Submit new inquiry (Public endpoint) |
| `POST` | `/api/contacts/<id>/reply/` | — | Dispatch email reply via SMTP relay |
| `POST` | `/api/contacts/<id>/toggle_star/` | — | Toggle starred flag |
| `POST` | `/api/contacts/<id>/mark_read/` | — | Mark inquiry as read |
| `DELETE` | `/api/contacts/<id>/` | — | Delete conversation |

---

### 8. 👤 Portfolio Profiles (`/api/profiles/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/profiles/` | `?website=dev-meet` | Get profile bio, socials, avatar, resume URL |
| `PUT` / `PATCH` | `/api/profiles/<id>/` | — | Update developer profile details |

---

### 9. 📊 Dashboard Analytics (`/api/dashboard/`)

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/stats/` | `?website=dev-meet` | Single-pass counts breakdown across all modules |
| `GET` | `/api/dashboard/activities/` | `?website=dev-meet` | Live stream of recent project & blog deployments |
| `GET` | `/api/dashboard/heatmap/` | — | 12-month annual contribution matrix (365 days) |
