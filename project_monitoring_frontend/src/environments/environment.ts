const w: any = (typeof globalThis !== 'undefined' && (globalThis as any).window) ? (globalThis as any).window : undefined;

/**
 * API base:
 * - If window.__APP_API_BASE_URL__ is provided by hosting, that value is used.
 * - Otherwise, default to http://localhost:3001/api for local dev when backend exposes /api.
 * Adjust as needed if you reverse-proxy frontend to backend (e.g., to '/api').
 */
export const environment = {
  production: false,
  // PUBLIC_INTERFACE
  API_BASE_URL: (w && w['__APP_API_BASE_URL__'])
    ? w['__APP_API_BASE_URL__']
    : 'http://localhost:3001/api'
};
