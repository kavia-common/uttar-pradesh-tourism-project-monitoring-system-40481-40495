export const Endpoints = {
  auth: {
    login: '/auth/login',
    me: '/auth/me',
    refresh: '/auth/refresh',
    logout: '/auth/logout'
  },
  users: '/users',
  projects: '/projects',
  tenders: '/tenders',
  contractors: '/contractors',
  funds: '/funds',
  milestones: '/milestones',
  inspections: '/inspections',
  payments: '/payments',
  geotag: '/geotag',
  reports: '/reports'
} as const;
