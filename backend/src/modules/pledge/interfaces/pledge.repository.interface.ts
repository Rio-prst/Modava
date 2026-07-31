export interface CreatePledgeInput {
  campaignId: string;
  userId: string;
  amount: number;
  message?: string;
  proofUrl?: string;
}

export interface PledgeResponse {
  id: string;
  campaignId: string;
  userId: string;
  amount: number;
  message: string | null;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  proofUrl: string | null;
  createdAt: Date;
}

export interface PendingPledgeResponse {
  id: string;
  campaignId: string;
  campaignTitle: string;
  userId: string;
  userName: string | null;
  userEmail: string | null;
  amount: number;
  message: string | null;
  proofUrl: string | null;
  createdAt: Date;
}

export interface PledgeWithCampaign extends PledgeResponse {
  amountRaised: number;
  fundingGoal: number;
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
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export const IPledgeRepository = Symbol('IPledgeRepository');

export interface IPledgeRepository {
  findUserByClerkUserId(clerkUserId: string): Promise<LocalUser | null>;
  findCampaignById(campaignId: string): Promise<LocalCampaign | null>;
  findCampaignOwnerId(campaignId: string): Promise<CampaignOwner | null>;
  create(data: CreatePledgeInput): Promise<PledgeResponse>;
  findPledgeById(id: string): Promise<LocalPledgeDetail | null>;
  deletePledge(id: string): Promise<void>;
  findAllByCampaignId(campaignId: string): Promise<PledgeResponse[]>;
  findAllByUserId(userId: string): Promise<PledgeResponse[]>;
  findPending(): Promise<PendingPledgeResponse[]>;
  verify(id: string, verifiedById: string): Promise<PledgeWithCampaign>;
  reject(id: string, reason?: string): Promise<PledgeResponse>;
  updateCampaignStatus(
    campaignId: string,
    status: 'DRAFT' | 'ACTIVE' | 'FUNDED' | 'CLOSED',
  ): Promise<void>;
}
