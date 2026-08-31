# 🛡️ DevMate Staff Admin REST API Reference

The **DevMate Admin REST API** (`admin_api`) is a secure, role-gated, versioned backend service providing full dynamic CRUD capabilities for managing portfolio data, uploading multimedia assets, ordering items, inspecting messages, and viewing real-time analytics.

All administrative actions are documented in markdown format in **[API.md](file:///e:/E/DevMate/API.md)**.

---

## 🔒 Security & Architecture Overview

- **Base URL**: `/api/v1/admin/` (canonical alias: `/api/admin/`)
- **Authentication**: JWT Bearer Tokens (`Authorization: Bearer <token>`)
- **Access Control**: Strict `is_staff = True` requirement. Non-staff and unauthenticated requests receive HTTP `401 Unauthorized` or `403 Forbidden`.
- **Upload Protection**: File extension whitelisting, MIME type verification, path traversal sanitation, and upload size validation.
- **XSS Sanitization**: Automated HTML stripping for dangerous `<script>`, `<iframe>`, and JavaScript event attributes.
- **Database Safety**: Multi-model writes wrapped in atomic transactions (`transaction.atomic`).

---

## 🔑 Authentication Endpoints

### 1. Staff Login (Generate JWT)
- **Method**: `POST`
- **Path**: `/api/v1/admin/auth/login/`
- **Request Body**:
```json
{
  "username": "admin_username",
  "password": "your_secure_password"
}
```
- **Response (HTTP 200)**:
```json
{
  "success": true,
  "message": "Welcome back, Roshan Damor!",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin_username",
    "email": "mail@logicbyroshan.in",
    "is_staff": true,
    "is_superuser": true
  }
}
```

### 2. Refresh Access Token
- **Method**: `POST`
- **Path**: `/api/v1/admin/auth/refresh/`
- **Request Body**:
```json
{
  "refresh": "<YOUR_REFRESH_TOKEN>"
}
```

### 3. Current Staff User Profile
- **Method**: `GET`
- **Path**: `/api/v1/admin/auth/me/`
- **Headers**: `Authorization: Bearer <ACCESS_TOKEN>`

---

## 📂 Admin CRUD Reference

All requests below require `Authorization: Bearer <ACCESS_TOKEN>`.

### 1. 🚀 Projects (`/api/v1/admin/projects/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/admin/projects/` | List all projects (supports query params: `?status=`, `?is_active=`, `?is_featured=`, `?category=`, `?search=`) |
| `POST` | `/api/v1/admin/projects/` | Create new project with optional `thumbnail` and `screenshots` (Multipart form or JSON) |
| `GET` | `/api/v1/admin/projects/{id}/` | Retrieve single project by ID with screenshots list |
| `PUT` / `PATCH` | `/api/v1/admin/projects/{id}/` | Full or partial project update (e.g. `documentation`, `technologies`, `status`) |
| `DELETE` | `/api/v1/admin/projects/{id}/` | Delete project and associated assets |
| `POST` | `/api/v1/admin/projects/{id}/upload-screenshots/` | Upload one or multiple screenshot images |
| `DELETE` | `/api/v1/admin/projects/{id}/screenshots/{screenshot_id}/` | Remove a specific project screenshot |
| `POST` | `/api/v1/admin/projects/{id}/toggle-active/` | Fast toggle active / inactive visibility |
| `POST` | `/api/v1/admin/projects/reorder/` | Reorder projects via `{"order_map": {"1": 0, "2": 1}}` |
| `POST` | `/api/v1/admin/projects/bulk-status/` | Bulk update project status or visibility |

---

### 2. 👤 Profile & Hero Configuration (`/api/v1/admin/profile/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/admin/profile/` | Retrieve profile and hero customization details |
| `PUT` / `PATCH` | `/api/v1/admin/profile/` | Update profile, `hero_badge`, `hero_description`, and live `hero_stat_*` counters |
| `POST` | `/api/v1/admin/profile/upload-image/` | Upload profile image (Multipart form) |
| `DELETE` | `/api/v1/admin/profile/delete-image/` | Remove profile picture |
| `POST` | `/api/v1/admin/profile/upload-hero-image/` | Upload custom hero illustration (Multipart form) |
| `DELETE` | `/api/v1/admin/profile/delete-hero-image/` | Remove hero image and revert to default |
| `POST` | `/api/v1/admin/profile/upload-document/` | Upload PDF resume or cover letter (`doc_type` = `resume` or `cover_letter`) |
| `DELETE` | `/api/v1/admin/profile/delete-document/?type=resume` | Delete uploaded document |

---

### 3. 💼 Work Experience (`/api/v1/admin/experience/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/admin/experience/` | List all work experiences |
| `POST` | `/api/v1/admin/experience/` | Create experience record with company logo and workplace photos |
| `GET` / `PATCH` / `DELETE` | `/api/v1/admin/experience/{id}/` | Retrieve, update, or delete experience |
| `POST` | `/api/v1/admin/experience/{id}/upload-images/` | Upload additional workplace images |
| `DELETE` | `/api/v1/admin/experience/{id}/images/{image_id}/` | Remove workplace image |

---

### 4. ⚡ Skills & Categories (`/api/v1/admin/skills/`, `/api/v1/admin/categories/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` / `POST` | `/api/v1/admin/skills/` | List or create skills |
| `PATCH` / `DELETE` | `/api/v1/admin/skills/{id}/` | Update proficiency, name, icon, or delete |
| `POST` | `/api/v1/admin/skills/reorder/` | Reorder skills via order map |
| `GET` / `POST` | `/api/v1/admin/categories/` | List or create categories (`?type=project|skill|experience`) |
| `PATCH` / `DELETE` | `/api/v1/admin/categories/{id}/` | Update or delete category |

---

### 5. 🏆 Achievements (`/api/v1/admin/achievements/`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` / `POST` | `/api/v1/admin/achievements/` | List or create achievements & certificates |
| `PATCH` / `DELETE` | `/api/v1/admin/achievements/{id}/` | Update or delete achievement |

---

### 6. 📬 Contact Inbox & Dashboard Analytics

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/admin/messages/` | List contact messages (`?status=new|read|replied|spam|archived`) |
| `PATCH` | `/api/v1/admin/messages/{id}/` | Update status, read flag, and staff notes |
| `POST` | `/api/v1/admin/messages/bulk-action/` | Bulk mark read, spam, or archive |
| `GET` | `/api/v1/admin/analytics/dashboard/` | Real-time aggregate counters and telemetry |

---

For full implementation schemas, payload formats, and frontend render contracts, refer to **[API.md](file:///e:/E/DevMate/API.md)**.
