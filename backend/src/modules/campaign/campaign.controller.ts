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
  Query,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { ICampaignService } from './interfaces/campaign.service.interface.js';
import { CreateCampaignDto } from './dto/create-campaign.dto.js';
import { UpdateCampaignDto } from './dto/update-campaign.dto.js';
import { UploadCampaignMediaDto } from './dto/upload-campaign-media.dto.js';
import type { PublicCampaignFilter } from './interfaces/campaign.service.interface.js';

function parseCampaignStatus(
  value: string | undefined,
): PublicCampaignFilter['status'] {
  if (
    value === 'ACTIVE' ||
    value === 'DRAFT' ||
    value === 'FUNDED' ||
    value === 'CLOSED'
  ) {
    return value;
  }
  return undefined;
}

function parseLegalitasStatus(
  value: string | undefined,
): PublicCampaignFilter['legalitasStatus'] {
  if (value === 'LENGKAP' || value === 'SEBAGIAN' || value === 'BELUM') {
    return value;
  }
  return undefined;
}

@Controller('campaigns')
export class CampaignController {
  constructor(
    @Inject(ICampaignService)
    private readonly campaignService: ICampaignService,
  ) {}

  @Get()
  async findAllPublic(
    @Query('status') status?: string,
    @Query('categoryId') categoryId?: string,
    @Query('minScore') minScore?: string,
    @Query('legalitasStatus') legalitasStatus?: string,
  ) {
    const campaigns = await this.campaignService.findAllPublic({
      status: parseCampaignStatus(status),
      categoryId,
      minScore: minScore ? Number(minScore) : undefined,
      legalitasStatus: parseLegalitasStatus(legalitasStatus),
    });
    return { data: campaigns };
  }

  @Get('mine')
  @UseGuards(ClerkAuthGuard)
  async findAll(@Req() req: AuthenticatedRequest) {
    const campaigns = await this.campaignService.findAll(req.user.clerkUserId);
    return { data: campaigns };
  }

  @Post()
  @UseGuards(ClerkAuthGuard)
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

  @Get('public/:id')
  async findPublicById(@Param('id') id: string) {
    const campaign = await this.campaignService.findPublicById(id);
    return { data: campaign };
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuard)
  async findById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const campaign = await this.campaignService.findById(
      req.user.clerkUserId,
      id,
    );
    return { data: campaign };
  }

  @Patch(':id')
  @UseGuards(ClerkAuthGuard)
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

  @Post(':id/media')
  @UseGuards(ClerkAuthGuard)
  async uploadMedia(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UploadCampaignMediaDto,
  ) {
    const media = await this.campaignService.uploadMedia(
      req.user.clerkUserId,
      id,
      dto,
    );
    return { data: media };
  }

  @Patch(':id/activate')
  @UseGuards(ClerkAuthGuard)
  async activate(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const campaign = await this.campaignService.activate(
      req.user.clerkUserId,
      id,
    );
    return { data: campaign };
  }
}
