import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { IUmkmProfileService } from './interfaces/umkm-profile.service.interface.js';
import { CreateUmkmProfileDto } from './dto/create-umkm-profile.dto.js';
import { UpdateUmkmProfileDto } from './dto/update-umkm-profile.dto.js';

@Controller('umkm-profiles')
@UseGuards(ClerkAuthGuard)
export class UmkmProfileController {
  constructor(
    @Inject(IUmkmProfileService)
    private readonly umkmProfileService: IUmkmProfileService,
  ) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateUmkmProfileDto,
  ) {
    const profile = await this.umkmProfileService.create(
      req.user.clerkUserId,
      dto,
    );
    return { data: profile };
  }

  @Get('mine')
  async findMine(@Req() req: AuthenticatedRequest) {
    const profile = await this.umkmProfileService.findByClerkUserId(
      req.user.clerkUserId,
    );
    return { data: profile };
  }

  @Patch('mine')
  async update(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateUmkmProfileDto,
  ) {
    const profile = await this.umkmProfileService.update(
      req.user.clerkUserId,
      dto,
    );
    return { data: profile };
  }
}
