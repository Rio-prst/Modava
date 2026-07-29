import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  DashboardData,
  IDashboardRepository,
} from './interfaces/dashboard.repository.interface.js';

@Injectable()
export class DashboardRepository implements IDashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(
    umkmProfileId: string,
    clerkUserId: string,
  ): Promise<DashboardData> {
    const [
      campaignStats,
      pledgeStats,
      recentTx,
      monthlySummary,
      creditScore,
      unreadNotifications,
      legalitasDocs,
    ] = await Promise.all([
      this.getCampaignStats(umkmProfileId),
      this.getPledgeStats(umkmProfileId),
      this.getRecentTransactions(umkmProfileId),
      this.getMonthlySummary(umkmProfileId),
      this.getCreditScore(umkmProfileId),
      this.getUnreadNotifications(clerkUserId),
      this.getLegalitasStats(umkmProfileId),
    ]);

    return {
      campaigns: campaignStats,
      pledges: pledgeStats,
      cashFlow: { recentTransactions: recentTx, thisMonth: monthlySummary },
      creditScore,
      unreadNotifications,
      legalitas: legalitasDocs,
    };
  }

  private async getCampaignStats(umkmProfileId: string) {
    const campaigns = await this.prisma.campaign.findMany({
      where: { umkmProfileId },
      select: { id: true, status: true, amountRaised: true },
    });

    const total = campaigns.length;
    const active = campaigns.filter((c) => c.status === 'ACTIVE').length;
    const totalAmountRaised = campaigns.reduce(
      (sum, c) => sum + Number(c.amountRaised),
      0,
    );

    return { total, active, totalAmountRaised };
  }

  private async getPledgeStats(umkmProfileId: string) {
    const total = await this.prisma.pledge.count({
      where: { campaign: { umkmProfileId } },
    });

    const recent = await this.prisma.pledge.findMany({
      where: { campaign: { umkmProfileId } },
      select: { id: true, amount: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return {
      total,
      recent: recent.map((r) => ({ ...r, amount: Number(r.amount) })),
    };
  }

  private async getRecentTransactions(umkmProfileId: string) {
    const tx = await this.prisma.cashFlowTransaction.findMany({
      where: { umkmProfileId },
      select: {
        id: true,
        type: true,
        amount: true,
        description: true,
        transactionDate: true,
      },
      orderBy: { transactionDate: 'desc' },
      take: 5,
    });

    return tx.map((t) => ({ ...t, amount: Number(t.amount) }));
  }

  private async getMonthlySummary(umkmProfileId: string) {
    const summary = await this.prisma.cashFlowMonthlySummary.findFirst({
      where: { umkmProfileId },
      orderBy: { year: 'desc', month: 'desc' },
    });

    if (!summary) {
      return null;
    }

    return {
      totalIncome: Number(summary.totalIncome),
      totalExpense: Number(summary.totalExpense),
    };
  }

  private async getCreditScore(umkmProfileId: string) {
    const score = await this.prisma.creditScore.findFirst({
      where: { umkmProfileId },
      orderBy: { calculatedAt: 'desc' },
      select: { overallScore: true, tier: true },
    });

    if (!score) {
      return null;
    }

    return { overallScore: score.overallScore, tier: score.tier };
  }

  private async getUnreadNotifications(clerkUserId: string) {
    const user = await this.prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return 0;
    }

    return this.prisma.notification.count({
      where: { userId: user.id, isRead: false },
    });
  }

  private async getLegalitasStats(umkmProfileId: string) {
    const documents = await this.prisma.legalitasDocument.findMany({
      where: { umkmProfileId },
      select: { status: true },
    });

    const verified = documents.filter((d) => d.status === 'VERIFIED').length;

    return { verified, total: documents.length };
  }
}
