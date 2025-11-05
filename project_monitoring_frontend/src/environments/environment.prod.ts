const w: any = (typeof globalThis !== 'undefined' && (globalThis as any).window) ? (globalThis as any).window : undefined;

export const environment = {
  production: true,
  API_BASE_URL: (w && w['__APP_API_BASE_URL__']) ? w['__APP_API_BASE_URL__'] : '/api'
};
