# DevAdmin - Multi-Site Portfolio Management Platform & REST API

<div align="center">

![DevAdmin Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80)

**An ultra-modern, enterprise-grade multi-tenant portfolio management system and REST API.**  
*Built with React 18, Vite, Tailwind CSS, Lucide Icons, Django 5.x REST Framework, SimpleJWT, MySQL / SQLite, and OpenAPI 3.0 / Swagger UI.*

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Django](https://img.shields.io/badge/Django-5.2-092e20.svg?logo=django)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/Django%20REST-3.16-red.svg)](https://www.django-rest-framework.org/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0-85ea2d.svg?logo=openapi-initiative)](http://localhost:8000/api/docs/)

[Features](#-key-features) • [Architecture](#-architecture) • [API Documentation](#-interactive-api-docs) • [Quick Start](#-quick-start) • [Direct Server Deployment](#-direct-server-production-deployment-no-docker) • [Directory Structure](#-repository-structure)

</div>

---

## 🌟 Key Features

### 1. 🏢 Multi-Tenant Site Partitioning
- Manage multiple independent developer portfolio websites from a single unified control console.
- Pre-configured sites: **DevMeet** (WebRTC Video Suite), **DevMitra** (AI Peer Pairing), and **DevMate** (Cloud IDE Sandbox).
- Instant multi-site switching from the top navbar with synchronized tenant-scoped API queries.

### 2. 🎴 3-Card Responsive Grid Layouts
- Uniform, high-density **3-card grids** (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) across all modules:
  - **Projects Showcase**
  - **Technical Blogs**
  - **Career Experience Milestones**
  - **Technical Skills & Stack**
  - **Frequently Asked Questions (FAQs)**
- Category filter pills, one-click visibility toggles, and direct Edit/Delete card actions.

### 3. ✍️ Ultra-Rich Content & System Architecture Builder (`RichContentBuilder`)
- Integrated into Projects, Technical Blogs, and Profile Bio.
- **Write**, **Split (Side-by-Side Editor & Live Preview)**, and **Preview** modes.
- Visual custom widgets:
  - 🏛️ **System Architecture Topologies** (` ```architecture `)
  - ⚡ **Performance Benchmark Bar Charts** (` ```chart:barchart `)
  - 📈 **Latency & Throughput Line Graphs** (` ```chart:linegraph `)
  - 📡 **REST API Specification Tables**
  - 🎬 **Video Walkthrough Embeds** (` ```video:embed `)
  - 💡 **Alert Callout Blocks** (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`)

### 4. 📊 12-Month Contribution Activity Heatmap
- Full 365-day annual commit and deployment activity matrix (January through December).
- 4-level color-coded contribution intensity legend.

### 5. 📬 Authenticated SMTP Email Reply Console
- Split 2-column contact inquiry feed and direct email composer.
- Dispatch live email replies via authenticated SMTP relay with timestamp tracking (`replied_at`, `is_read=True`).
- Quick canned reply suggestions (*"Available for work"*, *"Schedule Call"*).

### 6. 🔐 Full JWT Authentication System
- Dark glassmorphic **Security Console Modal** (`AuthModal.jsx`).
- Secure JWT token pair generation (`/api/auth/token/`), automatic token attachment to all outgoing requests, and persistent session storage.
- Administrator registration (`/api/auth/register/`) and one-click quick demo login.

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         React 18 Frontend SPA                               │
│       Vite │ Tailwind CSS │ Lucide Icons │ RichContentBuilder │ AuthContext │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST API (JSON / JWT Bearer)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 Django REST Framework Ingress & API Layer                   │
│         drf-spectacular (OpenAPI 3.0 / Swagger UI) │ SimpleJWT │ CORS       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     Reusable Service Layer (DRY Pattern)                    │
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
│         Database Layer (MySQL 8.0 / SQLite Dual Mode with B-Tree Indexes)   │
│  - idx_proj_site_status / idx_proj_site_cat / idx_proj_site_vis             │
│  - idx_blog_site_status / idx_blog_site_cat / idx_blog_site_vis             │
│  - idx_exp_site_status / idx_exp_site_cat / idx_exp_site_vis                │
│  - idx_msg_site_read / idx_msg_site_tag / idx_msg_site_starred              │
│  - idx_faq_site_cat / idx_faq_site_vis                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📖 Interactive API Docs

When running the backend server locally or in production, interactive documentation is available out of the box:

- **Swagger UI**: [`http://localhost:8000/api/docs/`](http://localhost:8000/api/docs/)
- **ReDoc**: [`http://localhost:8000/api/redoc/`](http://localhost:8000/api/redoc/)
- **OpenAPI Schema (JSON/YAML)**: [`http://localhost:8000/api/schema/`](http://localhost:8000/api/schema/)
- **Technical Specification Guide**: [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** 18+ or 20+ LTS
- **Python** 3.10+ or 3.11+
- **Git**

---

### 2. Backend Setup (Django REST Framework)

```bash
cd backend

# 1. Create and activate Python virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run database migrations
python manage.py migrate

# 4. Seed database with realistic multi-site portfolio data
python manage.py seed_data

# 5. (Optional) Create superuser admin
python manage.py createsuperuser

# 6. Start development server (Port 8000)
python manage.py runserver
```

> **Backend API is now live at:** `http://localhost:8000/api/`  
> **Swagger UI:** `http://localhost:8000/api/docs/`

---

### 3. Frontend Setup (React + Vite)

In a new terminal window:

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start Vite development server (Port 3000)
npm run dev
```

> **DevAdmin Dashboard is now live at:** `http://localhost:3000/`

---

## 🚀 Direct Server Production Deployment (No Docker)

DevAdmin is engineered for high-performance direct deployment on Linux VPS servers (Ubuntu 22.04 / 24.04 LTS or Debian) using **Nginx**, **Gunicorn (Systemd)**, and **MySQL**:

1. **System Packages**: Install Python 3.11, Node.js 20, Nginx, MySQL Server, and Certbot.
2. **Backend Daemon**: Configure `/etc/systemd/system/devadmin.service` with Gunicorn (3 workers).
3. **Nginx Reverse Proxy**: Configure `/etc/nginx/sites-available/devadmin` to serve `frontend/dist` and proxy `/api/` upstream.
4. **Automated Zero-Downtime Updates**: Run `bash scripts/deploy.sh` to pull changes, run migrations, and reload services.

👉 **See the complete step-by-step production setup guide in [DEPLOYMENT.md](DEPLOYMENT.md).**

---

## 📁 Repository Structure

```
Dev-Admin/
├── backend/
│   ├── apps/
│   │   ├── common/             # Reusable Service Layer (Tenant, Mail, Stats, Mixins)
│   │   ├── websites/           # Multi-tenant websites & Auth endpoints
│   │   ├── projects/           # Projects domain models & ViewSets
│   │   ├── blogs/              # Technical blogs with rich content models
│   │   ├── experiences/        # Career milestone models
│   │   ├── skills/             # Tech skills & proficiency models
│   │   ├── contacts/           # Contact inquiries & SMTP reply relay
│   │   ├── faqs/               # FAQs domain models
│   │   ├── profiles/           # Portfolio profile details & bio
│   │   └── dashboard/          # Aggregated analytics & heatmap views
│   ├── devadmin_backend/       # Root Django settings, WSGI, and URLs
│   ├── requirements.txt        # Frozen Python dependencies
│   ├── API_DOCUMENTATION.md    # Complete REST API specification
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/         # All UI views (Dashboard, Projects, Blogs, Details, etc.)
│   │   ├── context/            # AuthContext (JWT Session & state)
│   │   ├── services/           # Centralized API service client (api.js)
│   │   ├── App.jsx             # Main App layout & navigation state
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── scripts/
│   ├── deploy.sh               # One-click zero-downtime server deployment script
│   ├── devadmin.service        # Systemd daemon configuration
│   └── nginx.conf              # Production Nginx reverse proxy configuration
├── DEPLOYMENT.md               # Step-by-step VPS production deployment manual
└── README.md                   # Project documentation
```

---

## 📄 License

This project is licensed under the **MIT License**.
