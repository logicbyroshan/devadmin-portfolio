#!/usr/bin/env bash
# ========================================================
# DevAdmin One-Click Server Deployment & Update Script
# Usage: bash scripts/deploy.sh
# ========================================================

set -e

echo "🚀 Starting DevAdmin Production Deployment..."

PROJECT_DIR="/var/www/devadmin"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# 1. Pull Latest Code
echo "📦 Pulling latest changes from git repository..."
cd "$PROJECT_DIR"
git pull origin main

# 2. Update Backend Dependencies & Migrations
echo "🐍 Updating Python virtual environment & applying database migrations..."
cd "$BACKEND_DIR"
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py seed_data

# 3. Restart Gunicorn Service
echo "🔄 Restarting Gunicorn systemd daemon..."
sudo systemctl restart devadmin.service

# 4. Build Frontend Production SPA
echo "⚛️ Compiling React Vite production bundle..."
cd "$FRONTEND_DIR"
npm install
npm run build

# 5. Reload Nginx
echo "🌐 Reloading Nginx web server..."
sudo systemctl reload nginx

echo "✅ DevAdmin successfully deployed and live!"
