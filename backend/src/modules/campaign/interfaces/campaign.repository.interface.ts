export interface CreateCampaignInput {
  title: string;
  description: string;
  fundingGoal: number;
  startDate?: string;
  endDate?: string;
  loanSimulationId?: string;
}

export interface UpdateCampaignInput {
  title?: string;
  description?: string;
  fundingGoal?: number;
  startDate?: string;
  endDate?: string;
  loanSimulationId?: string;
}

export interface CampaignResponse {
  id: string;
  umkmProfileId: string;
  title: string;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  status: 'DRAFT' | 'ACTIVE' | 'FUNDED' | 'CLOSED';
  startDate: Date | null;
  endDate: Date | null;
  loanSimulationId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalUmkmProfile {
  id: string;
  userId: string;
}

export interface ExpiredCampaignResult {
  id: string;
  title: string;
  ownerUserId: string;
}

export interface CreateCampaignMediaInput {
  campaignId: string;
  fileUrl: string;
  fileType: 'IMAGE' | 'DOCUMENT';
  isPrimary: boolean;
}

export interface CampaignMediaResponse {
  id: string;
  campaignId: string;
  fileUrl: string;
  fileType: 'IMAGE' | 'DOCUMENT';
  isPrimary: boolean;
  createdAt: Date;
}

export const ICampaignRepository = Symbol('ICampaignRepository');

export interface ICampaignRepository {
  findUmkmProfileByClerkUserId(
    clerkUserId: string,
  ): Promise<LocalUmkmProfile | null>;
  findById(id: string): Promise<CampaignResponse | null>;
  findAllByUmkmProfileId(umkmProfileId: string): Promise<CampaignResponse[]>;
  create(
    umkmProfileId: string,
    data: CreateCampaignInput,
  ): Promise<CampaignResponse>;
  update(id: string, data: UpdateCampaignInput): Promise<CampaignResponse>;
  updateStatus(
    id: string,
    status: 'DRAFT' | 'ACTIVE' | 'FUNDED' | 'CLOSED',
  ): Promise<CampaignResponse>;
  findExpiredActiveCampaigns(now: Date): Promise<ExpiredCampaignResult[]>;
  createMedia(data: CreateCampaignMediaInput): Promise<CampaignMediaResponse>;
}
