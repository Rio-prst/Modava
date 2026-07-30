import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICreditScoreRepository } from './interfaces/credit-score.repository.interface.js';
import { ICreditScoreService } from './interfaces/credit-score.service.interface.js';
import { INotificationService } from '../notification/interfaces/notification.service.interface.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class CreditScoreService implements ICreditScoreService {
  constructor(
    @Inject(ICreditScoreRepository)
    private readonly creditScoreRepository: ICreditScoreRepository,
    @Inject(INotificationService)
    private readonly notificationService: INotificationService,
    private readonly prisma: PrismaService,
  ) {}

  async getScore(clerkUserId: string) {
    const profile =
      await this.creditScoreRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const score = await this.creditScoreRepository.findByUmkmProfileId(
      profile.id,
    );

    if (!score) {
      throw new NotFoundException('Credit score not yet calculated.');
    }

    return score;
  }

  async recalculate(clerkUserId: string) {
    const profile =
      await this.creditScoreRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const [
      cashFlowScore,
      legalitasScore,
      platformHistoryScore,
      documents,
      summaryCount,
      campaignCount,
    ] = await Promise.all([
      this.calculateCashFlowScore(profile.id),
      this.calculateLegalitasScore(profile.id),
      this.calculatePlatformScore(profile.id),
      this.prisma.legalitasDocument.findMany({
        where: { umkmProfileId: profile.id },
      }),
      this.prisma.cashFlowMonthlySummary.count({
        where: { umkmProfileId: profile.id },
      }),
      this.prisma.campaign.count({ where: { umkmProfileId: profile.id } }),
    ]);

    const overallScore =
      Math.round(
        (0.5 * cashFlowScore +
          0.3 * legalitasScore +
          0.2 * platformHistoryScore) *
          100,
      ) / 100;

    const tier = this.determineTier(overallScore);

    const recommendations = this.generateRecommendations(
      documents,
      cashFlowScore,
      legalitasScore,
      platformHistoryScore,
      summaryCount,
      campaignCount,
    );

    const result = await this.creditScoreRepository.upsert(profile.id, {
      overallScore,
      cashFlowScore,
      legalitasScore,
      platformHistoryScore,
      tier,
      breakdown: {
        cashFlowScore,
        legalitasScore,
        platformHistoryScore,
        weightFormula: '0.5 * cashFlow + 0.3 * legalitas + 0.2 * platform',
        scale: '0.00 - 4.00',
        calculatedAt: new Date().toISOString(),
        recommendations,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (user) {
      await this.notificationService.create({
        userId: user.id,
        type: 'SCORE_UPDATED',
        title: 'Skor kelayakan diperbarui!',
        message: `Skor kelayakan keuangan Anda kini ${overallScore} (Tier ${tier}).`,
        referenceId: result.id,
        referenceType: 'credit_score',
      });
    }

    return result;
  }

  private async calculateCashFlowScore(umkmProfileId: string): Promise<number> {
    const summary = await this.prisma.cashFlowMonthlySummary.findFirst({
      where: { umkmProfileId },
      orderBy: { year: 'desc', month: 'desc' },
    });

    if (!summary) {
      return 0;
    }

    const netProfit = Number(summary.netProfit);
    const totalIncome = Number(summary.totalIncome);

    if (totalIncome <= 0) {
      return 0;
    }

    const ratio = netProfit / totalIncome;
    const score = Math.round((ratio + 1) * 2 * 100) / 100;

    return Math.max(0, Math.min(4, score));
  }

  private async calculateLegalitasScore(
    umkmProfileId: string,
  ): Promise<number> {
    const documents = await this.prisma.legalitasDocument.findMany({
      where: { umkmProfileId },
    });

    if (documents.length === 0) {
      return 0;
    }

    const verifiedCount = documents.filter(
      (d) => d.status === 'VERIFIED',
    ).length;
    const ratio = verifiedCount / documents.length;

    return Math.round(ratio * 4 * 100) / 100;
  }

  private async calculatePlatformScore(umkmProfileId: string): Promise<number> {
    const [campaignCount, pledgeCount] = await Promise.all([
      this.prisma.campaign.count({ where: { umkmProfileId } }),
      this.prisma.pledge.count({
        where: { campaign: { umkmProfileId } },
      }),
    ]);

    let score = 0;

    if (campaignCount > 0) {
      score += 1.2;
    }

    score += Math.min(2.8, pledgeCount * 0.4);

    return Math.round(score * 100) / 100;
  }

  private determineTier(score: number): string {
    if (score >= 3.5) {
      return 'A';
    }

    if (score >= 3.0) {
      return 'B';
    }

    if (score >= 2.5) {
      return 'C';
    }

    return 'D';
  }

  private generateRecommendations(
    documents: Array<{ status: string; documentType: string; id: string }>,
    cashFlowScore: number,
    legalitasScore: number,
    _platformHistoryScore: number,
    summaryCount: number,
    campaignCount: number,
  ): Array<{ field: string; message: string; potential: string }> {
    const recommendations: Array<{
      field: string;
      message: string;
      potential: string;
    }> = [];

    const verifiedTypes = new Set(
      documents
        .filter((d) => d.status === 'VERIFIED')
        .map((d) => d.documentType),
    );

    const missingDocs = [
      { key: 'NIB', label: 'NIB (Nomor Induk Berusaha)' },
      { key: 'NPWP', label: 'NPWP' },
      { key: 'IUMK', label: 'IUMK' },
    ];

    for (const doc of missingDocs) {
      if (!verifiedTypes.has(doc.key)) {
        recommendations.push({
          field: 'legalitas',
          message: `Lengkapi ${doc.label} untuk meningkatkan skor legalitas.`,
          potential: '+0.2 poin',
        });
      }
    }

    if (cashFlowScore < 2.0) {
      if (summaryCount < 3) {
        recommendations.push({
          field: 'cashFlow',
          message:
            'Catat arus kas 3 bulan berturut-turut untuk +0,3 poin pada skor arus kas.',
          potential: '+0.3 poin',
        });
      } else {
        recommendations.push({
          field: 'cashFlow',
          message:
            'Tingkatkan rasio laba bersih terhadap pemasukan untuk skor arus kas lebih tinggi.',
          potential: '+0.2 poin',
        });
      }
    }

    if (_platformHistoryScore < 1.0 && campaignCount === 0) {
      recommendations.push({
        field: 'platform',
        message:
          'Buat campaign crowdfunding pertama Anda untuk mendapatkan skor riwayat platform.',
        potential: '+1.2 poin',
      });
    }

    return recommendations;
  }
}
