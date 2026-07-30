import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IDashboardRepository } from './interfaces/dashboard.repository.interface.js';
import { IDashboardService } from './interfaces/dashboard.service.interface.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @Inject(IDashboardRepository)
    private readonly dashboardRepository: IDashboardRepository,
    private readonly prisma: PrismaService,
  ) {}

  async get(clerkUserId: string) {
    const profile = await this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    return this.dashboardRepository.get(profile.id, clerkUserId);
  }
}
