import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard.js';
import type { AuthenticatedRequest } from '../../common/types/api-response.js';
import { ICashFlowService } from './interfaces/cash-flow.service.interface.js';
import { CreateCashFlowDto } from './dto/create-cash-flow.dto.js';

@Controller('cash-flow')
@UseGuards(ClerkAuthGuard)
export class CashFlowController {
  constructor(
    @Inject(ICashFlowService)
    private readonly cashFlowService: ICashFlowService,
  ) {}

  @Post('transactions')
  async createTransaction(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCashFlowDto,
  ) {
    const transaction = await this.cashFlowService.create(
      req.user.clerkUserId,
      dto,
    );
    return { data: transaction };
  }

  @Get('transactions')
  async listTransactions(
    @Req() req: AuthenticatedRequest,
    @Query('month') month?: string,
    @Query('year') year?: string,
    @Query('type') type?: 'INCOME' | 'EXPENSE',
  ) {
    const parsedMonth = month ? parseInt(month, 10) : undefined;
    const parsedYear = year ? parseInt(year, 10) : undefined;

    const transactions = await this.cashFlowService.findAll(
      req.user.clerkUserId,
      {
        month: parsedMonth,
        year: parsedYear,
        type,
      },
    );

    return { data: transactions };
  }

  @Get('summary')
  async getSummary(
    @Req() req: AuthenticatedRequest,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ) {
    const summary = await this.cashFlowService.getSummary(
      req.user.clerkUserId,
      month,
      year,
    );

    return { data: summary };
  }
}
