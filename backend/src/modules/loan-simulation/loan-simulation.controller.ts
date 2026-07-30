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
import { ILoanSimulationService } from './interfaces/loan-simulation.service.interface.js';
import { CreateLoanSimulationDto } from './dto/create-loan-simulation.dto.js';

@Controller('loan-simulations')
@UseGuards(ClerkAuthGuard)
export class LoanSimulationController {
  constructor(
    @Inject(ILoanSimulationService)
    private readonly loanSimulationService: ILoanSimulationService,
  ) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateLoanSimulationDto,
  ) {
    const simulation = await this.loanSimulationService.create(
      req.user.clerkUserId,
      dto,
    );
    return { data: simulation };
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const simulations = await this.loanSimulationService.findAll(
      req.user.clerkUserId,
    );
    return { data: simulations };
  }

  @Get(':id')
  async findById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const simulation = await this.loanSimulationService.findById(
      req.user.clerkUserId,
      id,
    );
    return { data: simulation };
  }

  @Delete(':id')
  async delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    await this.loanSimulationService.delete(req.user.clerkUserId, id);
    return { data: null };
  }
}
