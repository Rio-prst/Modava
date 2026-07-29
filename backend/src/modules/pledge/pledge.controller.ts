import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { IPledgeService } from './interfaces/pledge.service.interface.js';
import { CreatePledgeDto } from './dto/create-pledge.dto.js';

@Controller('pledges')
@UseGuards(ClerkAuthGuard)
export class PledgeController {
  constructor(
    @Inject(IPledgeService) private readonly pledgeService: IPledgeService,
  ) {}

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreatePledgeDto) {
    const pledge = await this.pledgeService.create(req.user.clerkUserId, dto);
    return { data: pledge };
  }

  @Delete(':id')
  async cancel(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.pledgeService.cancel(req.user.clerkUserId, id);
    return { data: null };
  }

  @Get('campaign/:campaignId')
  async findByCampaign(@Param('campaignId') campaignId: string) {
    const pledges = await this.pledgeService.findAllByCampaign(campaignId);
    return { data: pledges };
  }

  @Get('mine')
  async findMine(@Req() req: AuthenticatedRequest) {
    const pledges = await this.pledgeService.findAllMy(req.user.clerkUserId);
    return { data: pledges };
  }
}
