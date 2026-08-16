# DevAdmin Backend — Django REST Framework Multi-Site API

A production-grade Python Django REST Framework backend designed for managing multi-tenant portfolio websites (**Dev-Meet**, **Dev-Mitra**, and **Dev-Mate**).

---

## 🛠 Tech Stack

- **Core**: Python 3.10+ & Django 5.x
- **API Framework**: Django REST Framework (DRF)
- **Authentication**: Simple JWT (`djangorestframework-simplejwt`) & Session Auth
- **Database**: MySQL (Engine: `django.db.backends.mysql` with fallback to SQLite for local development)
- **CORS**: `django-cors-headers`
- **Security**: SecurityMiddleware, X-Frame-Options, CSRF, Password Validators

---

## 🚀 Setup & Installation

### 1. Virtual Environment & Dependencies

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Database options in `.env`:
- `USE_MYSQL=True` to use MySQL (`mysqlclient` required).
- `USE_MYSQL=False` (default) to run SQLite zero-config locally.

### 3. Database Migrations & Initial Setup

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 4. Run Development Server

```bash
python manage.py runserver 8000
```

---

## 📡 REST API Reference Table

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/token/` | Obtain JWT Access & Refresh Token Pair | No |
| `POST` | `/api/auth/token/refresh/` | Refresh Expired Access Token | No |
| `GET` / `POST` | `/api/websites/` | List or create website target configs | Auth for POST |
| `GET` / `PUT` | `/api/websites/<slug>/` | Retrieve or update website by slug | Auth for PUT |
| `GET` / `POST` | `/api/blogs/` | List or create blog posts (Filter: `?website=dev-meet`) | Auth for POST |
| `GET` / `POST` | `/api/projects/` | List or create portfolio projects | Auth for POST |
| `GET` / `POST` | `/api/experiences/` | List or create work experiences | Auth for POST |
| `GET` / `POST` | `/api/skills/` | List or create tech stack skills | Auth for POST |
| `GET` / `POST` | `/api/contacts/` | List or submit contact inquiries | Public POST |

---

## 🔒 Security & Best Practices

- All modifying endpoints (`POST`, `PUT`, `DELETE`) require JWT `Bearer <token>` authentication except public contact form submissions.
- Strict CORS policies configured via `CORS_ALLOWED_ORIGINS`.
- SQL injection protection via Django ORM parameterized queries.
