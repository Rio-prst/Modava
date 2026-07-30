import type {
  CreateCampaignInput,
  UpdateCampaignInput,
  CampaignResponse,
  CampaignMediaResponse,
} from './campaign.repository.interface.js';

export interface PublicCampaignFilter {
  status?: 'ACTIVE' | 'DRAFT' | 'FUNDED' | 'CLOSED';
  categoryId?: string;
  minScore?: number;
  legalitasStatus?: 'LENGKAP' | 'SEBAGIAN' | 'BELUM';
}

export const ICampaignService = Symbol('ICampaignService');

export interface PublicCampaignDetail {
  id: string;
  title: string;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  umkmProfile: {
    businessName: string;
    city: string | null;
    categoryId: string | null;
    category: { name: string } | null;
  };
  creditScore: {
    overallScore: number;
    tier: string;
  } | null;
  pledgeCount: number;
}

export interface UploadCampaignMediaInput {
  fileUrl: string;
  fileType: 'IMAGE' | 'DOCUMENT';
  isPrimary: boolean;
}

export interface ICampaignService {
  create(
    clerkUserId: string,
    data: CreateCampaignInput,
  ): Promise<CampaignResponse>;
  findAll(clerkUserId: string): Promise<CampaignResponse[]>;
  findById(clerkUserId: string, id: string): Promise<CampaignResponse>;
  update(
    clerkUserId: string,
    id: string,
    data: UpdateCampaignInput,
  ): Promise<CampaignResponse>;
  activate(clerkUserId: string, id: string): Promise<CampaignResponse>;
  findAllPublic(filter?: PublicCampaignFilter): Promise<unknown[]>;
  findPublicById(id: string): Promise<PublicCampaignDetail>;
  uploadMedia(
    clerkUserId: string,
    campaignId: string,
    data: UploadCampaignMediaInput,
  ): Promise<CampaignMediaResponse>;
}
