# DevAdmin — Multi-Website Management Platform

![DevAdmin Platform](https://img.shields.io/badge/DevAdmin-v2.0-blue?style=for-the-badge) ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react) ![Django](https://img.shields.io/badge/Django-5.x-092E20?style=for-the-badge&logo=django) ![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

A complete, full-stack multi-website management dashboard designed to administer **Dev-Meet**, **Dev-Mitra**, and **Dev-Mate** from a single intuitive interface.

---

## 📁 Full-Stack Project Structure

```
Dev-Admin/
├── frontend/             # React 18 + Vite + TailwindCSS + Space Grotesk Font
│   ├── src/              # Components, views, design tokens, and state
│   ├── index.html        # Main HTML template with Space Grotesk Google Font
│   ├── package.json      # Frontend package configuration
│   └── README.md         # Detailed frontend documentation
│
├── backend/              # Django 5.x REST Framework + MySQL Backend
│   ├── apps/             # Multi-site domain apps (Websites, Blogs, Projects, Skills, Contacts)
│   ├── devadmin_backend/ # Django settings, JWT configuration, and URLs
│   ├── manage.py         # Django CLI entrypoint
│   ├── requirements.txt  # Python package dependencies
│   └── README.md         # Detailed backend documentation & API reference
│
├── .gitignore            # Git ignore specification
└── README.md             # Platform architecture overview (This File)
```

---

## ⚡ Quick Start Guide

### 1. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` (or `http://localhost:3002`) to launch the interactive UI.

---

### 2. Backend Setup (Django REST Framework + MySQL)

```bash
cd backend
python -m venv venv

# Activate Virtual Environment (Windows)
venv\Scripts\activate

# Install Dependencies
pip install -r requirements.txt

# Run Migrations & Start Server
python manage.py migrate
python manage.py runserver 8000
```
API endpoints available at `http://127.0.0.1:8000/api/`.

---

## 🎨 Design & Site Themes

- **Typography**: Space Grotesk
- **Background Aesthetics**: Pure Pitch Black (`#000000`) with layered dark charcoal card containers.
- **Site-Specific Themes**:
  - 🔵 **Dev-Meet**: Sapphire Blue Theme
  - 🩵 **Dev-Mitra**: Sky Blue Theme
  - 💜 **Dev-Mate**: Deep Violet Theme
