import { Controller, Get, Req, UseGuards, Inject } from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { IDashboardService } from './interfaces/dashboard.service.interface.js';

@Controller('dashboard')
@UseGuards(ClerkAuthGuard)
export class DashboardController {
  constructor(
    @Inject(IDashboardService)
    private readonly dashboardService: IDashboardService,
  ) {}

  @Get()
  async get(@Req() req: AuthenticatedRequest) {
    const dashboard = await this.dashboardService.get(req.user.clerkUserId);
    return { data: dashboard };
  }
}
