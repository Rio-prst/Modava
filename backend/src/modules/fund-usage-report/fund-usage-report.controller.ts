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
import { IFundUsageReportService } from './interfaces/fund-usage-report.service.interface.js';
import { CreateFundUsageDto } from './dto/create-fund-usage.dto.js';
import { UpdateFundUsageDto } from './dto/update-fund-usage.dto.js';

@Controller('fund-usage')
@UseGuards(ClerkAuthGuard)
export class FundUsageReportController {
  constructor(
    @Inject(IFundUsageReportService)
    private readonly fundUsageReportService: IFundUsageReportService,
  ) {}

  @Post(':campaignId')
  async create(
    @Req() req: AuthenticatedRequest,
    @Param('campaignId') campaignId: string,
    @Body() dto: CreateFundUsageDto,
  ) {
    const report = await this.fundUsageReportService.create(
      req.user.clerkUserId,
      campaignId,
      dto,
    );
    return { data: report };
  }

  @Get(':campaignId')
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Param('campaignId') campaignId: string,
  ) {
    const reports = await this.fundUsageReportService.findAll(
      req.user.clerkUserId,
      campaignId,
    );
    return { data: reports };
  }

  @Patch('item/:id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateFundUsageDto,
  ) {
    const report = await this.fundUsageReportService.update(
      req.user.clerkUserId,
      id,
      dto,
    );
    return { data: report };
  }
}
