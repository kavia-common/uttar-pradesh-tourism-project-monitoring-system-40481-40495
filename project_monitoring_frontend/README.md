# UPSTDC Project Monitoring Frontend (Angular)

This Angular app provides the user interface for the Project Monitoring System, including authentication, dashboards, and feature modules for users, projects, tenders, contractors, funds, milestones, inspections, payments, geo-tagging, and reports.

## Development server
```bash
npm install
npm start
```
By default, the app runs at http://localhost:3000 with SSR static hosting handled by Express when built.

## API base URL configuration
The app reads API base URL from a global window variable when running in the browser:
- window.__APP_API_BASE_URL__ (set by hosting environment, optional)
If not set, it defaults to '/api'. Configure your reverse proxy accordingly or inject the variable in index.html before the Angular bundle.

## Authentication
- JWT access token is stored in localStorage (keys: pm_access_token, pm_refresh_token).
- An HTTP interceptor injects the Bearer token and auto-logs out on 401.

## Routes and Access
- /auth/login (public)
- All other routes are protected by an auth guard; Users page requires ADMIN role.

## Styling
Minimal responsive styling with a sidebar layout and header. Shared components include table, file upload, loading overlay, and toast notifications.

## Notes
This is a functional skeleton wired to call backend endpoints. Integrate with the backend URLs as per deployment.
