import type { PledgeResponse } from './pledge.repository.interface.js';

export interface CreatePledgeDtoInput {
  campaignId: string;
  amount: number;
  message?: string;
}

export const IPledgeService = Symbol('IPledgeService');

export interface IPledgeService {
  create(
    clerkUserId: string,
    data: CreatePledgeDtoInput,
  ): Promise<PledgeResponse>;
  findAllByCampaign(campaignId: string): Promise<PledgeResponse[]>;
  findAllMy(clerkUserId: string): Promise<PledgeResponse[]>;
}
