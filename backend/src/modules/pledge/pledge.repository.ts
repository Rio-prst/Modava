import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CreatePledgeInput,
  PledgeResponse,
  PledgeWithCampaign,
  PendingPledgeResponse,
  LocalPledgeDetail,
  IPledgeRepository,
} from './interfaces/pledge.repository.interface.js';

@Injectable()
export class PledgeRepository implements IPledgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByClerkUserId(clerkUserId: string) {
    return this.prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });
  }

  async findCampaignById(campaignId: string) {
    const result = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: {
        id: true,
        status: true,
        umkmProfileId: true,
        fundingGoal: true,
        amountRaised: true,
      },
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      fundingGoal: result.fundingGoal.toNumber(),
      amountRaised: result.amountRaised.toNumber(),
    };
  }

  async findCampaignOwnerId(campaignId: string) {
    const result = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: {
        umkmProfileId: true,
        umkmProfile: { select: { userId: true } },
      },
    });

    if (!result) {
      return null;
    }

    return {
      userId: result.umkmProfile.userId,
      umkmProfileId: result.umkmProfileId,
    };
  }

  async create(data: CreatePledgeInput): Promise<PledgeResponse> {
    const result = await this.prisma.pledge.create({
      data: {
        campaignId: data.campaignId,
        userId: data.userId,
        amount: data.amount,
        message: data.message ?? null,
        status: 'PENDING',
        proofUrl: data.proofUrl ?? null,
      },
    });

    return { ...result, amount: result.amount.toNumber() };
  }

  async findPledgeById(id: string): Promise<LocalPledgeDetail | null> {
    const result = await this.prisma.pledge.findUnique({ where: { id } });

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      userId: result.userId,
      campaignId: result.campaignId,
      amount: result.amount.toNumber(),
      status: result.status,
    };
  }

  async deletePledge(id: string): Promise<void> {
    await this.prisma.pledge.delete({ where: { id } });
  }

  async findAllByCampaignId(campaignId: string): Promise<PledgeResponse[]> {
    const results = await this.prisma.pledge.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((r) => ({ ...r, amount: r.amount.toNumber() }));
  }

  async findAllByUserId(userId: string): Promise<PledgeResponse[]> {
    const results = await this.prisma.pledge.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((r) => ({ ...r, amount: r.amount.toNumber() }));
  }

  async findPending(): Promise<PendingPledgeResponse[]> {
    const results = await this.prisma.pledge.findMany({
      where: { status: 'PENDING' },
      include: {
        user: { select: { name: true, email: true } },
        campaign: { select: { title: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return results.map((r) => ({
      id: r.id,
      campaignId: r.campaignId,
      campaignTitle: r.campaign.title,
      userId: r.userId,
      userName: r.user.name,
      userEmail: r.user.email,
      amount: r.amount.toNumber(),
      message: r.message,
      proofUrl: r.proofUrl,
      createdAt: r.createdAt,
    }));
  }

  async verify(id: string, verifiedById: string): Promise<PledgeWithCampaign> {
    const result = await this.prisma.$transaction(async (tx) => {
      const pledge = await tx.pledge.update({
        where: { id },
        data: {
          status: 'VERIFIED',
          verifiedById,
          verifiedAt: new Date(),
        },
      });

      const campaign = await tx.campaign.update({
        where: { id: pledge.campaignId },
        data: { amountRaised: { increment: pledge.amount } },
      });

      return { pledge, campaign };
    });

    return {
      id: result.pledge.id,
      campaignId: result.pledge.campaignId,
      userId: result.pledge.userId,
      amount: result.pledge.amount.toNumber(),
      message: result.pledge.message,
      status: result.pledge.status,
      proofUrl: result.pledge.proofUrl,
      createdAt: result.pledge.createdAt,
      amountRaised: result.campaign.amountRaised.toNumber(),
      fundingGoal: result.campaign.fundingGoal.toNumber(),
    };
  }

  async reject(id: string, reason?: string): Promise<PledgeResponse> {
    const result = await this.prisma.pledge.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectReason: reason ?? null,
      },
    });

    return { ...result, amount: result.amount.toNumber() };
  }

  async updateCampaignStatus(
    campaignId: string,
    status: 'DRAFT' | 'ACTIVE' | 'FUNDED' | 'CLOSED',
  ): Promise<void> {
    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: { status },
    });
  }
}
