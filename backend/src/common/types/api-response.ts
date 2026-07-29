import type { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  clerkUserId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: 'UMKM' | 'CONTRIBUTOR' | 'ADMIN';
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export interface ApiResponse<T> {
  data: T;
}
