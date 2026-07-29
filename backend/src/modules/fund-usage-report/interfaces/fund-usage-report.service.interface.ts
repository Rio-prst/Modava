import type {
  CreateFundUsageInput,
  UpdateFundUsageInput,
  FundUsageReportResponse,
} from './fund-usage-report.repository.interface.js';

export const IFundUsageReportService = Symbol('IFundUsageReportService');

export interface IFundUsageReportService {
  create(
    clerkUserId: string,
    campaignId: string,
    data: Omit<CreateFundUsageInput, 'campaignId'>,
  ): Promise<FundUsageReportResponse>;
  findAll(
    clerkUserId: string,
    campaignId: string,
  ): Promise<FundUsageReportResponse[]>;
  update(
    clerkUserId: string,
    id: string,
    data: UpdateFundUsageInput,
  ): Promise<FundUsageReportResponse>;
}
