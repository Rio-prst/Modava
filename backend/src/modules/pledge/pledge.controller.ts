import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import { AdminGuard } from '../../common/guards/admin.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { IPledgeService } from './interfaces/pledge.service.interface.js';
import { CreatePledgeDto } from './dto/create-pledge.dto.js';
import { RejectPledgeDto } from './dto/reject-pledge.dto.js';

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

  @Get('admin/pending')
  @UseGuards(AdminGuard)
  async findPending() {
    const pledges = await this.pledgeService.findPending();
    return { data: pledges };
  }

  @Patch('admin/:id/verify')
  @UseGuards(AdminGuard)
  async verify(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const pledge = await this.pledgeService.verify(req.user.clerkUserId, id);
    return { data: pledge };
  }

  @Patch('admin/:id/reject')
  @UseGuards(AdminGuard)
  async reject(@Param('id') id: string, @Body() dto: RejectPledgeDto) {
    const pledge = await this.pledgeService.reject(id, dto.reason);
    return { data: pledge };
  }
}
