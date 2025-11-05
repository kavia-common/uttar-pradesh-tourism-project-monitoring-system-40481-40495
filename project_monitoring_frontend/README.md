# UPSTDC Project Monitoring Frontend (Angular)

This Angular app provides the user interface for the Project Monitoring System, including authentication, dashboards, and feature modules for users, projects, tenders, contractors, funds, milestones, inspections, payments, geo-tagging, and reports.

## Development server
```bash
npm install
npm start
```
By default, the app runs at http://localhost:3000.

## API base URL configuration
The app reads API base URL from a global window variable when running in the browser:
- window.__APP_API_BASE_URL__ (set by hosting environment, optional)
If not set:
- dev default: http://localhost:3001/api (backend should expose /api)
- prod default: /api (assumes reverse proxy)

You can also hardcode environment.ts during local development if needed.

## Authentication
- JWT access token is stored in localStorage (keys: pm_access_token, pm_refresh_token).
- An HTTP interceptor injects the Bearer token and auto-logs out on 401.

## Routes and Access
- /auth/login (public)
- All other routes are protected by an auth guard; Users page requires ADMIN role.

Seeded admin (for local E2E):
- Email: admin@example.com
- Password: Admin@123
(Adjust if you changed the seed file)

## Styling
Minimal responsive styling with a sidebar layout and header. Shared components include table, file upload, loading overlay, and toast notifications.

## Notes
- Ensure CORS_ALLOWED_ORIGINS on backend includes http://localhost:3000 for local dev.
- For file upload, the API expects multipart/form-data at POST /files/upload; download via GET /files/{filename}.
- Reports: GET /api/reports/projects (JSON) and /api/reports/projects.csv (CSV).
