import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CashFlowTransactionResponse,
  CreateCashFlowInput,
  CashFlowFilter,
  ICashFlowRepository,
} from './interfaces/cash-flow.repository.interface.js';

@Injectable()
export class CashFlowRepository implements ICashFlowRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUmkmProfileByClerkUserId(clerkUserId: string) {
    return this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      select: { id: true, userId: true },
    });
  }

  async create(
    umkmProfileId: string,
    data: CreateCashFlowInput,
  ): Promise<CashFlowTransactionResponse> {
    const result = await this.prisma.cashFlowTransaction.create({
      data: {
        umkmProfileId,
        type: data.type,
        amount: data.amount,
        description: data.description,
        category: data.category ?? null,
        transactionDate: new Date(data.transactionDate),
      },
    });

    return { ...result, amount: result.amount.toNumber() };
  }

  async findAll(
    umkmProfileId: string,
    filter: CashFlowFilter,
  ): Promise<CashFlowTransactionResponse[]> {
    const gte =
      filter.month !== undefined && filter.year !== undefined
        ? new Date(filter.year, filter.month - 1, 1)
        : undefined;

    const lte =
      filter.month !== undefined && filter.year !== undefined
        ? new Date(filter.year, filter.month, 0, 23, 59, 59, 999)
        : undefined;

    const results = await this.prisma.cashFlowTransaction.findMany({
      where: {
        umkmProfileId,
        transactionDate: gte && lte ? { gte, lte } : undefined,
        type: filter.type,
      },
      orderBy: { transactionDate: 'desc' },
    });

    return results.map((r) => ({ ...r, amount: r.amount.toNumber() }));
  }

  async getSummary(umkmProfileId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const transactions = await this.prisma.cashFlowTransaction.findMany({
      where: {
        umkmProfileId,
        transactionDate: { gte: startDate, lte: endDate },
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      const amount = tx.amount.toNumber();
      if (tx.type === 'INCOME') {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }
    }

    return {
      month,
      year,
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
      transactionCount: transactions.length,
    };
  }
}
