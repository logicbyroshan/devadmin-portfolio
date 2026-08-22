# DevAdmin Direct Server Production Deployment Guide (No Docker)

A complete, step-by-step technical guide for deploying the **DevAdmin Multi-Site Management System** directly to any Linux VPS (Ubuntu 22.04 / 24.04 LTS or Debian) with **Nginx**, **Gunicorn**, **MySQL**, **Python 3.11+**, and **Node.js 20+**.

---

## 🏗️ Architecture Overview

```
[ Incoming HTTPS (Port 443 / 80) ]
                 │
                 ▼
          ┌─────────────┐
          │    Nginx    │  <── Reverse Proxy & Static File Server
          └──────┬──────┘
                 │
     ┌───────────┴──────────────────────┐
     │                                  │
     ▼ (Port 80 / Static)               ▼ (/api/ upstream)
┌─────────────────────────┐    ┌─────────────────────────────────┐
│ React Production Build  │    │     Gunicorn WSGI Daemon        │
│ (/var/www/.../dist)     │    │  (127.0.0.1:8000 / 3 Workers)   │
└─────────────────────────┘    └────────────────┬────────────────┘
                                                │
                                                ▼
                               ┌─────────────────────────────────┐
                               │       MySQL 8.0 Database        │
                               │        (devadmin_db)            │
                               └─────────────────────────────────┘
```

---

## 📋 Server Prerequisites

Connect to your clean Linux VPS via SSH:

```bash
ssh ubuntu@your-server-ip
```

### 1. Update Packages & Install System Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv python3-dev build-essential \
                    libmysqlclient-dev pkg-config default-libmysqlclient-dev \
                    nginx git curl ufw
```

### 2. Install Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v # Should display v20.x.x
npm -v
```

### 3. Install & Configure MySQL Server

```bash
sudo apt install -y mysql-server
sudo systemctl enable mysql
sudo systemctl start mysql

# Secure MySQL Installation
sudo mysql_secure_installation
```

Log in to MySQL and provision the database and user:

```sql
sudo mysql -u root -p
```

```sql
CREATE DATABASE devadmin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'devadmin_user'@'localhost' IDENTIFIED BY 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON devadmin_db.* TO 'devadmin_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 📦 Project Setup

### 1. Clone the Codebase into `/var/www/devadmin`

```bash
sudo mkdir -p /var/www/devadmin
sudo chown -R $USER:$USER /var/www/devadmin
git clone https://github.com/logicbyroshan/devadmin-portfolio.git /var/www/devadmin
cd /var/www/devadmin
```

---

## 🐍 Backend Configuration

### 1. Create Python Virtual Environment & Install Requirements

```bash
cd /var/www/devadmin/backend
python3 -m venv venv
source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
```

### 2. Configure Environment Variables (`.env`)

```bash
cp .env.example .env
nano .env
```

Set your production values:

```env
DEBUG=False
SECRET_KEY=generate_a_random_50_char_secret_key_here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,127.0.0.1,localhost

USE_MYSQL=True
DB_NAME=devadmin_db
DB_USER=devadmin_user
DB_PASSWORD=YourStrongPassword123!
DB_HOST=127.0.0.1
DB_PORT=3306

USE_REAL_SMTP=True
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
DEFAULT_FROM_EMAIL=DevAdmin <noreply@yourdomain.com>

CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 3. Run Database Migrations & Collect Static Files

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py seed_data
```

### 4. Create Superuser Administrator

```bash
python manage.py createsuperuser
```

---

## ⚙️ Systemd Daemon Setup (Gunicorn)

### 1. Install the Systemd Unit File

```bash
sudo cp /var/www/devadmin/scripts/devadmin.service /etc/systemd/system/devadmin.service
```

> **Note**: Update `User=ubuntu` in `/etc/systemd/system/devadmin.service` if your VPS username is different.

### 2. Enable & Start the Gunicorn Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable devadmin.service
sudo systemctl start devadmin.service
sudo systemctl status devadmin.service
```

---

## ⚛️ Frontend Build (React 18 + Vite)

### 1. Install NPM Packages & Build Production Bundle

```bash
cd /var/www/devadmin/frontend
npm install
npm run build
```

This generates optimized static files inside `/var/www/devadmin/frontend/dist`.

---

## 🌐 Nginx Web Server Configuration

### 1. Copy the Nginx Config

```bash
sudo cp /var/www/devadmin/scripts/nginx.conf /etc/nginx/sites-available/devadmin
```

Edit `/etc/nginx/sites-available/devadmin` and replace `yourdomain.com` with your actual domain or VPS IP:

```bash
sudo nano /etc/nginx/sites-available/devadmin
```

### 2. Enable the Site and Test Configuration

```bash
sudo ln -sf /etc/nginx/sites-available/devadmin /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 Free SSL Certificate (Let's Encrypt / Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically configure HTTPS redirects and renewals in Nginx.

---

## 🔄 Automated Zero-Downtime Updates (`deploy.sh`)

Whenever you push new updates to GitHub, simply SSH into your server and run:

```bash
cd /var/www/devadmin
bash scripts/deploy.sh
```

---

## 🛡️ Firewall Configuration (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 🔍 Useful Health Check Commands

| Action | Command |
|---|---|
| **Check Gunicorn Status** | `sudo systemctl status devadmin.service` |
| **View Backend Error Logs** | `sudo tail -f /var/log/devadmin_error.log` |
| **Check Nginx Status** | `sudo systemctl status nginx` |
| **Test Backend System Check** | `cd /var/www/devadmin/backend && venv/bin/python manage.py check` |
| **Open Interactive Swagger UI** | `https://yourdomain.com/api/docs/` |
