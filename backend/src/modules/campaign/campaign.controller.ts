import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { ICampaignService } from './interfaces/campaign.service.interface.js';
import { CreateCampaignDto } from './dto/create-campaign.dto.js';
import { UpdateCampaignDto } from './dto/update-campaign.dto.js';

@Controller('campaigns')
@UseGuards(ClerkAuthGuard)
export class CampaignController {
  constructor(
    @Inject(ICampaignService)
    private readonly campaignService: ICampaignService,
  ) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCampaignDto,
  ) {
    const campaign = await this.campaignService.create(
      req.user.clerkUserId,
      dto,
    );
    return { data: campaign };
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const campaigns = await this.campaignService.findAll(req.user.clerkUserId);
    return { data: campaigns };
  }

  @Get(':id')
  async findById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const campaign = await this.campaignService.findById(
      req.user.clerkUserId,
      id,
    );
    return { data: campaign };
  }

  @Patch(':id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateCampaignDto,
  ) {
    const campaign = await this.campaignService.update(
      req.user.clerkUserId,
      id,
      dto,
    );
    return { data: campaign };
  }

  @Patch(':id/activate')
  async activate(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const campaign = await this.campaignService.activate(
      req.user.clerkUserId,
      id,
    );
    return { data: campaign };
  }
}
