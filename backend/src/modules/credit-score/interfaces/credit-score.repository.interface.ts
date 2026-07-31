import type { Prisma } from '@prisma/client';

export interface CreditScoreResponse {
  id: string;
  umkmProfileId: string;
  overallScore: number;
  cashFlowScore: number;
  legalitasScore: number;
  platformHistoryScore: number;
  tier: string;
  breakdown: Prisma.JsonValue;
  calculatedAt: Date;
}

export interface LocalUmkmProfile {
  id: string;
}

export interface CreditScoreData {
  overallScore: number;
  cashFlowScore: number;
  legalitasScore: number;
  platformHistoryScore: number;
  tier: string;
  breakdown: Prisma.InputJsonValue;
}

export const ICreditScoreRepository = Symbol('ICreditScoreRepository');

export interface ICreditScoreRepository {
  findUmkmProfileByClerkUserId(
    clerkUserId: string,
  ): Promise<LocalUmkmProfile | null>;
  findByUmkmProfileId(
    umkmProfileId: string,
  ): Promise<CreditScoreResponse | null>;
  upsert(
    umkmProfileId: string,
    data: CreditScoreData,
  ): Promise<CreditScoreResponse>;
}
