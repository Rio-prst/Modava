import { Controller, Get, Post, Req, UseGuards, Inject } from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { ICreditScoreService } from './interfaces/credit-score.service.interface.js';

@Controller('credit-score')
@UseGuards(ClerkAuthGuard)
export class CreditScoreController {
  constructor(
    @Inject(ICreditScoreService)
    private readonly creditScoreService: ICreditScoreService,
  ) {}

  @Get()
  async getScore(@Req() req: AuthenticatedRequest) {
    const score = await this.creditScoreService.getScore(req.user.clerkUserId);
    return { data: score };
  }

  @Post('recalculate')
  async recalculate(@Req() req: AuthenticatedRequest) {
    const score = await this.creditScoreService.recalculate(
      req.user.clerkUserId,
    );
    return { data: score };
  }
}
