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
  fundingGoal: number;
  amountRaised: number;
}

export interface CampaignOwner {
  userId: string;
  umkmProfileId: string;
}

export interface LocalPledgeDetail {
  id: string;
  userId: string;
  campaignId: string;
  amount: number;
}

export const IPledgeRepository = Symbol('IPledgeRepository');

export interface IPledgeRepository {
  findUserByClerkUserId(clerkUserId: string): Promise<LocalUser | null>;
  findCampaignById(campaignId: string): Promise<LocalCampaign | null>;
  findCampaignOwnerId(campaignId: string): Promise<CampaignOwner | null>;
  create(data: CreatePledgeInput): Promise<PledgeResponse>;
  findPledgeById(id: string): Promise<LocalPledgeDetail | null>;
  deletePledgeAndRefund(
    id: string,
    campaignId: string,
    amount: number,
  ): Promise<void>;
  findAllByCampaignId(campaignId: string): Promise<PledgeResponse[]>;
  findAllByUserId(userId: string): Promise<PledgeResponse[]>;
  updateCampaignStatus(
    campaignId: string,
    status: 'DRAFT' | 'ACTIVE' | 'FUNDED' | 'CLOSED',
  ): Promise<void>;
}
