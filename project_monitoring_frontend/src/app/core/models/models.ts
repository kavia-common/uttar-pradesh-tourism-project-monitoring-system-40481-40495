/**
 * Typed models used across application.
 * Keep these minimal and extensible. These reflect common backend DTO shapes.
 */

export type ID = string | number;

// PUBLIC_INTERFACE
export interface ApiResponse<T> {
  /** Whether the request was successful */
  success: boolean;
  /** Optional message for user display */
  message?: string;
  /** Data payload */
  data?: T;
  /** Error details if any */
  error?: string | Record<string, unknown>;
}

// PUBLIC_INTERFACE
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

// PUBLIC_INTERFACE
export interface User {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'PMU' | 'DEPARTMENT' | 'FIELD' | 'VIEWER';
  active: boolean;
}

// PUBLIC_INTERFACE
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

// PUBLIC_INTERFACE
export interface LoginRequest {
  email: string;
  password: string;
}

// PUBLIC_INTERFACE
export interface Project {
  id: ID;
  title: string;
  description?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  status?: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'ON_HOLD';
  lat?: number;
  lng?: number;
}

// PUBLIC_INTERFACE
export interface Tender {
  id: ID;
  projectId: ID;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'AWARDED';
}

// PUBLIC_INTERFACE
export interface Contractor {
  id: ID;
  name: string;
  contact?: string;
  email?: string;
}

// PUBLIC_INTERFACE
export interface Fund {
  id: ID;
  projectId: ID;
  amount: number;
  releasedOn?: string;
  remarks?: string;
}

// PUBLIC_INTERFACE
export interface Milestone {
  id: ID;
  projectId: ID;
  name: string;
  dueDate?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  progress?: number; // 0-100
}

// PUBLIC_INTERFACE
export interface Inspection {
  id: ID;
  projectId: ID;
  date: string;
  remarks?: string;
  images?: string[];
  lat?: number;
  lng?: number;
}

// PUBLIC_INTERFACE
export interface Payment {
  id: ID;
  projectId: ID;
  amount: number;
  paidOn?: string;
  reference?: string;
}

// PUBLIC_INTERFACE
export interface ReportDescriptor {
  id: string;
  name: string;
  description?: string;
  downloadUrl?: string;
}
