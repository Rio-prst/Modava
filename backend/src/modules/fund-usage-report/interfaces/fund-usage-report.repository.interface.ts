export interface CreateFundUsageInput {
  campaignId: string;
  description: string;
  amount: number;
  notes?: string;
}

export interface UpdateFundUsageInput {
  status?: 'PLANNED' | 'SPENT';
  description?: string;
  amount?: number;
  notes?: string;
}

export interface FundUsageReportResponse {
  id: string;
  campaignId: string;
  description: string;
  amount: number;
  status: 'PLANNED' | 'SPENT';
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalCampaign {
  id: string;
  umkmProfileId: string;
}

export interface LocalUmkmProfile {
  id: string;
}

export const IFundUsageReportRepository = Symbol('IFundUsageReportRepository');

export interface IFundUsageReportRepository {
  findCampaignById(campaignId: string): Promise<LocalCampaign | null>;
  findUmkmProfileByClerkUserId(
    clerkUserId: string,
  ): Promise<LocalUmkmProfile | null>;
  create(data: CreateFundUsageInput): Promise<FundUsageReportResponse>;
  findAllByCampaignId(campaignId: string): Promise<FundUsageReportResponse[]>;
  findById(id: string): Promise<FundUsageReportResponse | null>;
  update(
    id: string,
    data: UpdateFundUsageInput,
  ): Promise<FundUsageReportResponse>;
}
