import type { CreditScoreResponse } from './credit-score.repository.interface.js';

export const ICreditScoreService = Symbol('ICreditScoreService');

export interface ICreditScoreService {
  getScore(clerkUserId: string): Promise<CreditScoreResponse>;
  recalculate(clerkUserId: string): Promise<CreditScoreResponse>;
}
