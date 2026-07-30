import type { DashboardData } from './dashboard.repository.interface.js';

export const IDashboardService = Symbol('IDashboardService');

export interface IDashboardService {
  get(clerkUserId: string): Promise<DashboardData>;
}
