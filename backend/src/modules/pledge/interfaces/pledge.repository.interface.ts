export interface CreatePledgeInput {
  campaignId: string;
  userId: string;
  amount: number;
  message?: string;
}

export interface PledgeResponse {
  id: string;
  campaignId: string;
  userId: string;
  amount: number;
  message: string | null;
  createdAt: Date;
}

export interface LocalUser {
  id: string;
}

export interface LocalCampaign {
  id: string;
  status: string;
  umkmProfileId: string;
}

export const IPledgeRepository = Symbol('IPledgeRepository');

export interface IPledgeRepository {
  findUserByClerkUserId(clerkUserId: string): Promise<LocalUser | null>;
  findCampaignById(campaignId: string): Promise<LocalCampaign | null>;
  create(data: CreatePledgeInput): Promise<PledgeResponse>;
  findAllByCampaignId(campaignId: string): Promise<PledgeResponse[]>;
  findAllByUserId(userId: string): Promise<PledgeResponse[]>;
}
