import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CashFlowTransactionResponse,
  CreateCashFlowInput,
  UpdateCashFlowInput,
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

    const d = result.transactionDate;
    await this.upsertMonthlySummary(
      umkmProfileId,
      d.getMonth() + 1,
      d.getFullYear(),
    );

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

  async findTransactionById(
    id: string,
  ): Promise<CashFlowTransactionResponse | null> {
    const result = await this.prisma.cashFlowTransaction.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return { ...result, amount: result.amount.toNumber() };
  }

  async update(
    id: string,
    data: UpdateCashFlowInput,
  ): Promise<CashFlowTransactionResponse> {
    const old = await this.prisma.cashFlowTransaction.findUnique({
      where: { id },
      select: { transactionDate: true, umkmProfileId: true },
    });

    const result = await this.prisma.cashFlowTransaction.update({
      where: { id },
      data: {
        ...data,
        transactionDate: data.transactionDate
          ? new Date(data.transactionDate)
          : undefined,
      },
    });

    if (old) {
      await this.upsertMonthlySummary(
        old.umkmProfileId,
        old.transactionDate.getMonth() + 1,
        old.transactionDate.getFullYear(),
      );
    }

    await this.upsertMonthlySummary(
      result.umkmProfileId,
      result.transactionDate.getMonth() + 1,
      result.transactionDate.getFullYear(),
    );

    return { ...result, amount: result.amount.toNumber() };
  }

  async delete(id: string): Promise<void> {
    const old = await this.prisma.cashFlowTransaction.findUnique({
      where: { id },
      select: { transactionDate: true, umkmProfileId: true },
    });

    await this.prisma.cashFlowTransaction.delete({ where: { id } });

    if (old) {
      await this.upsertMonthlySummary(
        old.umkmProfileId,
        old.transactionDate.getMonth() + 1,
        old.transactionDate.getFullYear(),
      );
    }
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

  private async upsertMonthlySummary(
    umkmProfileId: string,
    month: number,
    year: number,
  ) {
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

    await this.prisma.cashFlowMonthlySummary.upsert({
      where: {
        umkmProfileId_month_year: { umkmProfileId, month, year },
      },
      create: {
        umkmProfileId,
        month,
        year,
        totalIncome,
        totalExpense,
        netProfit: totalIncome - totalExpense,
        transactionCount: transactions.length,
      },
      update: {
        totalIncome,
        totalExpense,
        netProfit: totalIncome - totalExpense,
        transactionCount: transactions.length,
      },
    });
  }

  async recalculateAllSummaries(umkmProfileId: string) {
    const transactions = await this.prisma.cashFlowTransaction.findMany({
      where: { umkmProfileId },
      select: { transactionDate: true },
      orderBy: { transactionDate: 'asc' },
    });

    const seen = new Set<string>();
    for (const tx of transactions) {
      const key = `${tx.transactionDate.getFullYear()}-${tx.transactionDate.getMonth() + 1}`;
      if (!seen.has(key)) {
        seen.add(key);
        await this.upsertMonthlySummary(
          umkmProfileId,
          tx.transactionDate.getMonth() + 1,
          tx.transactionDate.getFullYear(),
        );
      }
    }
  }
}
