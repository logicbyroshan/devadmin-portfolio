# DevAdmin — Multi-Portfolio Management System

> A premium full-stack admin panel for managing multiple developer portfolios (DevMeet, DevMitra, DevMate) from a single unified dark-glass dashboard interface.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS v3 + Custom Design System (index.css) |
| **Fonts** | Inter (body), Space Grotesk (UI), Courgette (accent headings) |
| **Icons** | Lucide React |
| **Backend** | Django 4 + Django REST Framework |
| **Database** | SQLite (dev) / PostgreSQL (production) |
| **Rich Editor** | Custom RichContentBuilder (architecture diagrams, charts, video, tables) |

---

## Project Structure

```
Dev-Admin/
+-- frontend/
¦   +-- src/
¦   ¦   +-- App.jsx                  # Root: auth state, WEBSITES config
¦   ¦   +-- index.css                # Design system: tokens, buttons, badges, inputs
¦   ¦   +-- components/
¦   ¦       +-- Navbar.jsx           # Top navbar: site switcher, notifications, profile
¦   ¦       +-- Sidebar.jsx          # Left sidebar (w-40): page navigation
¦   ¦       +-- DashboardView.jsx    # Stats, heatmap, quick actions, recent messages
¦   ¦       +-- ExperiencesView.jsx  # Career milestones CRUD (3-card + editor page)
¦   ¦       +-- SkillsView.jsx       # Tech stack with proficiency bars
¦   ¦       +-- ProjectsView.jsx     # Portfolio projects with RichContentBuilder
¦   ¦       +-- BlogsView.jsx        # Blog articles with RichContentBuilder
¦   ¦       +-- MessagesView.jsx     # Split inbox: left=feed, right=reader+SMTP reply
¦   ¦       +-- FaqsView.jsx         # FAQ CRUD (3-card grid + editor page)
¦   ¦       +-- DetailsView.jsx      # Portfolio profile: avatar, bio, social links
¦   ¦       +-- SettingsView.jsx     # Site settings, user management, password
¦   ¦       +-- RichContentBuilder.jsx # Rich markdown editor with live preview
¦   ¦       +-- LoginView.jsx
¦   ¦       +-- SignupView.jsx
¦   ¦       +-- LogoutModal.jsx
+-- backend/
¦   +-- devadmin_backend/
¦   ¦   +-- settings.py
¦   ¦   +-- urls.py
¦   ¦   +-- wsgi.py
¦   ¦   +-- asgi.py
¦   +-- manage.py
+-- README.md
```

---

## Design System

All components follow a **unified design token system** in index.css.

### Button Heights — 36px (h-9) Across ALL buttons

| Button Type | Classes Used |
|---|---|
| Primary action | h-9 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg |
| Secondary / Edit | h-9 px-3 bg-neutral-900/60 border border-neutral-800 rounded-lg |
| Danger / Delete | h-9 w-9 bg-rose-950/20 border border-rose-900/40 rounded-lg |
| Visible toggle | h-9 px-3 bg-emerald-500/15 border border-emerald-500/30 rounded-lg |
| Hidden toggle | h-9 px-3 bg-neutral-800/60 border border-neutral-700 rounded-lg |

### Badge Padding Standard

All badges: px-2.5 py-1 rounded-md text-xs font-bold (NOT text-[10px] or py-0.5)

### Dropdown Height Standard

All category filter selects: h-9 pl-3.5 pr-8 rounded-lg (same 36px as Add button)

---

## RichContentBuilder Syntax

`markdown
# Architecture Diagram
`rchitecture
Frontend:React 18 -> API Gateway:Kong -> Backend:Django REST -> DB:PostgreSQL
`

# Benchmark Bar Chart
`chart:barchart
title:API Response Times
React SSR:45ms
Django REST:82ms
`

# Video Embed
`ideo:embed
https://www.youtube.com/watch?v=VIDEO_ID
`

# Alert Callout
> [!NOTE] Informational note here
> [!WARNING] Critical warning here
`

---

## Local Development

`ash
# Frontend
cd frontend
npm install
npm run dev        # http://localhost:3000

# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver   # http://localhost:8000
`

---

## Design Standards

- Sidebar width: w-40 (160px), main content offset: md:ml-40
- Navbar height: h-16 (64px), main content top padding: pt-16
- Base font: 14px (Inter/Space Grotesk)
- Card bg: bg-[#07080d], page header bg: bg-[#07080d]
- Active sidebar: bg-blue-500/15 text-blue-400 border border-blue-500/30
- All button heights: h-9 (36px) — consistent everywhere
- All badge padding: px-2.5 py-1 text-xs — consistent everywhere
- All category selects: h-9 — same height as adjacent Add buttons

---

## Bug Fixes Applied

| # | File | Bug | Status |
|---|---|---|---|
| 1 | SkillsView.jsx | handleToggleVisible used undefined e instead of s — ReferenceError crash | Fixed |
| 2 | Navbar.jsx | Dropdowns never closed on outside click — no click handler | Fixed |
| 3 | MessagesView.jsx | isSentToast state was tracked but never rendered to user | Fixed |
| 4 | All card views | Button heights inconsistent: py-1.5 / py-2 / py-2.5 mixed | Fixed — all h-9 |
| 5 | All card views | Badges: text-[10px] py-0.5 too small and inconsistent | Fixed — text-xs py-1 |
| 6 | All page headers | Category dropdowns shorter than Add buttons | Fixed — all h-9 |
| 7 | All editors | Left-side back button duplicated Cancel button | Removed |
| 8 | Multiple files | Unused imports added unnecessary bundle weight | Cleaned |

---

*Built with love — DevAdmin v1.0 | logicbyroshan*
