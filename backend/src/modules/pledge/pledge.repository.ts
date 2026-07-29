import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CreatePledgeInput,
  PledgeResponse,
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

  findCampaignById(campaignId: string) {
    return this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, status: true, umkmProfileId: true },
    });
  }

  async create(data: CreatePledgeInput): Promise<PledgeResponse> {
    const { campaignId, userId, amount, message } = data;

    const result = await this.prisma.$transaction(async (tx) => {
      const pledge = await tx.pledge.create({
        data: {
          campaignId,
          userId,
          amount,
          message: message ?? null,
        },
      });

      await tx.campaign.update({
        where: { id: campaignId },
        data: { amountRaised: { increment: amount } },
      });

      return pledge;
    });

    return { ...result, amount: result.amount.toNumber() };
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
}
