import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CampaignResponse,
  CreateCampaignInput,
  UpdateCampaignInput,
  ICampaignRepository,
} from './interfaces/campaign.repository.interface.js';

@Injectable()
export class CampaignRepository implements ICampaignRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUmkmProfileByClerkUserId(clerkUserId: string) {
    return this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      select: { id: true, userId: true },
    });
  }

  async findById(id: string): Promise<CampaignResponse | null> {
    const result = await this.prisma.campaign.findUnique({ where: { id } });

    if (!result) {
      return null;
    }

    return {
      ...result,
      fundingGoal: result.fundingGoal.toNumber(),
      amountRaised: result.amountRaised.toNumber(),
    };
  }

  async findAllByUmkmProfileId(
    umkmProfileId: string,
  ): Promise<CampaignResponse[]> {
    const results = await this.prisma.campaign.findMany({
      where: { umkmProfileId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((r) => ({
      ...r,
      fundingGoal: r.fundingGoal.toNumber(),
      amountRaised: r.amountRaised.toNumber(),
    }));
  }

  async create(
    umkmProfileId: string,
    data: CreateCampaignInput,
  ): Promise<CampaignResponse> {
    const result = await this.prisma.campaign.create({
      data: {
        umkmProfileId,
        title: data.title,
        description: data.description,
        fundingGoal: data.fundingGoal,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        loanSimulationId: data.loanSimulationId ?? null,
      },
    });

    return {
      ...result,
      fundingGoal: result.fundingGoal.toNumber(),
      amountRaised: result.amountRaised.toNumber(),
    };
  }

  async update(
    id: string,
    data: UpdateCampaignInput,
  ): Promise<CampaignResponse> {
    const result = await this.prisma.campaign.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });

    return {
      ...result,
      fundingGoal: result.fundingGoal.toNumber(),
      amountRaised: result.amountRaised.toNumber(),
    };
  }

  async updateStatus(
    id: string,
    status: 'DRAFT' | 'ACTIVE' | 'FUNDED' | 'CLOSED',
  ): Promise<CampaignResponse> {
    const result = await this.prisma.campaign.update({
      where: { id },
      data: { status },
    });

    return {
      ...result,
      fundingGoal: result.fundingGoal.toNumber(),
      amountRaised: result.amountRaised.toNumber(),
    };
  }
}
