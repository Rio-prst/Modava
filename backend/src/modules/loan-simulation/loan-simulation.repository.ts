import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type {
  CreateLoanSimulationInput,
  LoanSimulationResponse,
  ILoanSimulationRepository,
} from './interfaces/loan-simulation.repository.interface.js';

@Injectable()
export class LoanSimulationRepository implements ILoanSimulationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUmkmProfileByClerkUserId(clerkUserId: string) {
    return this.prisma.uMKMProfile.findFirst({
      where: { user: { clerkUserId } },
      select: { id: true },
    });
  }

  async create(
    umkmProfileId: string,
    data: CreateLoanSimulationInput,
  ): Promise<LoanSimulationResponse> {
    const monthlyRate = 0.005;
    const { amount, tenor } = data;

    const monthlyPayment =
      (amount * (monthlyRate * (1 + monthlyRate) ** tenor)) /
      ((1 + monthlyRate) ** tenor - 1);
    const totalPayment = monthlyPayment * tenor;
    const totalInterest = totalPayment - amount;

    const result = await this.prisma.loanSimulation.create({
      data: {
        umkmProfileId,
        amount,
        tenor,
        interestRate: 0.5,
        monthlyPayment,
        totalPayment,
        totalInterest,
      },
    });

    return {
      ...result,
      amount: result.amount.toNumber(),
      monthlyPayment: result.monthlyPayment.toNumber(),
      totalPayment: result.totalPayment.toNumber(),
      totalInterest: result.totalInterest.toNumber(),
    };
  }

  async findAllByUmkmProfileId(
    umkmProfileId: string,
  ): Promise<LoanSimulationResponse[]> {
    const results = await this.prisma.loanSimulation.findMany({
      where: { umkmProfileId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((r) => ({
      ...r,
      amount: r.amount.toNumber(),
      monthlyPayment: r.monthlyPayment.toNumber(),
      totalPayment: r.totalPayment.toNumber(),
      totalInterest: r.totalInterest.toNumber(),
    }));
  }

  async findById(id: string): Promise<LoanSimulationResponse | null> {
    const result = await this.prisma.loanSimulation.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      amount: result.amount.toNumber(),
      monthlyPayment: result.monthlyPayment.toNumber(),
      totalPayment: result.totalPayment.toNumber(),
      totalInterest: result.totalInterest.toNumber(),
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loanSimulation.delete({ where: { id } });
  }
}
