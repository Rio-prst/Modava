import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CreateFundUsageInput,
  UpdateFundUsageInput,
  FundUsageReportResponse,
  IFundUsageReportRepository,
} from './interfaces/fund-usage-report.repository.interface.js';

@Injectable()
export class FundUsageReportRepository implements IFundUsageReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  findCampaignById(campaignId: string) {
    return this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, umkmProfileId: true },
    });
  }

  findUmkmProfileByClerkUserId(clerkUserId: string) {
    return this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      select: { id: true },
    });
  }

  async create(data: CreateFundUsageInput): Promise<FundUsageReportResponse> {
    const result = await this.prisma.fundUsageReport.create({ data });

    return { ...result, amount: result.amount.toNumber() };
  }

  async findAllByCampaignId(
    campaignId: string,
  ): Promise<FundUsageReportResponse[]> {
    const results = await this.prisma.fundUsageReport.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((r) => ({ ...r, amount: r.amount.toNumber() }));
  }

  async findById(id: string): Promise<FundUsageReportResponse | null> {
    const result = await this.prisma.fundUsageReport.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return { ...result, amount: result.amount.toNumber() };
  }

  async update(
    id: string,
    data: UpdateFundUsageInput,
  ): Promise<FundUsageReportResponse> {
    const result = await this.prisma.fundUsageReport.update({
      where: { id },
      data,
    });

    return { ...result, amount: result.amount.toNumber() };
  }
}
