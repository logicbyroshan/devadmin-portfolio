# DevAdmin Frontend — Multi-Site Control Dashboard

A modern, high-density, sharp-cornered administrative control panel built with **React**, **Vite**, **TailwindCSS**, and **Lucide React**. Designed specifically to manage multi-tenant web applications (`Dev-Meet`, `Dev-Mitra`, and `Dev-Mate`) from a single unified interface.

---

## 🎨 Design System & Aesthetics

- **Typography**: Space Grotesk (`'Space Grotesk', sans-serif`)
- **Theme**: Deep Pitch Black (`#000000`) with layered charcoal cards (`#07080d` / `#0a0b0f`).
- **Border Radius**: Sharp, compact border radii (`rounded-lg` 8px / `rounded-md` 6px).
- **Site-Specific Color Coordination**:
  - **Dev-Meet**: Electric Blue (`#3b82f6`) theme & heatmaps.
  - **Dev-Mitra**: Sky Blue (`#38bdf8`) theme & heatmaps.
  - **Dev-Mate**: Deep Violet (`#a855f7`) theme & heatmaps.

---

## 🚀 Key Features

1. **Interactive Multi-Website Selector**: Switch live targets between **Dev-Meet**, **Dev-Mitra**, and **Dev-Mate** directly from the logo sidebar dropdown.
2. **Dynamic Activity Heatmap**: Proportional 12-month activity grid displaying 7 days per week in color-coordinated fluid boxes.
3. **Status Pipelines**: Proportional visual progress meters for Done, In-Progress, and Planned Projects and Blogs.
4. **Responsive Layout**: High-density grid locked above 1920px with mobile sidebar drawer support.

---

## 💻 Local Development Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Server runs on: `http://localhost:3000` (or `http://localhost:3002`).

---

## 📁 Directory Structure

```
frontend/
├── public/              # Static assets & logos
├── src/
│   ├── components/      # Modular UI components (Navbar, Sidebar, Views)
│   ├── App.jsx          # Root layout & state manager
│   ├── index.css        # Global CSS & Space Grotesk font import
│   └── main.jsx         # React DOM entry point
├── index.html           # HTML template with Space Grotesk Google Font
├── package.json         # NPM scripts and dependencies
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite bundler configuration
```
