import type {
  PledgeResponse,
  PendingPledgeResponse,
} from './pledge.repository.interface.js';

export interface CreatePledgeDtoInput {
  campaignId: string;
  amount: number;
  message?: string;
  proofUrl?: string;
}

export const IPledgeService = Symbol('IPledgeService');

export interface IPledgeService {
  create(
    clerkUserId: string,
    data: CreatePledgeDtoInput,
  ): Promise<PledgeResponse>;
  cancel(clerkUserId: string, id: string): Promise<void>;
  findAllByCampaign(campaignId: string): Promise<PledgeResponse[]>;
  findAllMy(clerkUserId: string): Promise<PledgeResponse[]>;
  findPending(): Promise<PendingPledgeResponse[]>;
  verify(clerkUserId: string, id: string): Promise<PledgeResponse>;
  reject(id: string, reason?: string): Promise<PledgeResponse>;
}
