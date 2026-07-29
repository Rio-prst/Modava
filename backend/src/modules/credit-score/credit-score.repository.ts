import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CreditScoreData,
  ICreditScoreRepository,
} from './interfaces/credit-score.repository.interface.js';

@Injectable()
export class CreditScoreRepository implements ICreditScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUmkmProfileByClerkUserId(clerkUserId: string) {
    return this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      select: { id: true },
    });
  }

  async findByUmkmProfileId(umkmProfileId: string) {
    return this.prisma.creditScore.findFirst({
      where: { umkmProfileId },
      orderBy: { calculatedAt: 'desc' },
    });
  }

  async upsert(umkmProfileId: string, data: CreditScoreData) {
    const existing = await this.prisma.creditScore.findFirst({
      where: { umkmProfileId },
    });

    if (existing) {
      return this.prisma.creditScore.update({
        where: { id: existing.id },
        data: { ...data, calculatedAt: new Date() },
      });
    }

    return this.prisma.creditScore.create({
      data: { umkmProfileId, ...data },
    });
  }
}
