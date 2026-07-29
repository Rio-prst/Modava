import type {
  CreateCampaignInput,
  UpdateCampaignInput,
  CampaignResponse,
} from './campaign.repository.interface.js';

export const ICampaignService = Symbol('ICampaignService');

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
}
