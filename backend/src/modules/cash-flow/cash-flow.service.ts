import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ICashFlowRepository } from './interfaces/cash-flow.repository.interface.js';
import type {
  CreateCashFlowInput,
  UpdateCashFlowInput,
  CashFlowFilter,
} from './interfaces/cash-flow.repository.interface.js';
import { ICashFlowService } from './interfaces/cash-flow.service.interface.js';

@Injectable()
export class CashFlowService implements ICashFlowService {
  constructor(
    @Inject(ICashFlowRepository)
    private readonly cashFlowRepository: ICashFlowRepository,
  ) {}

  async create(clerkUserId: string, data: CreateCashFlowInput) {
    const profile =
      await this.cashFlowRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException(
        'UMKM profile not found. Create profile first.',
      );
    }

    return this.cashFlowRepository.create(profile.id, data);
  }

  async findAll(clerkUserId: string, filter: CashFlowFilter) {
    const profile =
      await this.cashFlowRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    return this.cashFlowRepository.findAll(profile.id, filter);
  }

  async update(clerkUserId: string, id: string, data: UpdateCashFlowInput) {
    const transaction = await this.cashFlowRepository.findTransactionById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }

    const profile =
      await this.cashFlowRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    if (transaction.umkmProfileId !== profile.id) {
      throw new ForbiddenException('Access denied.');
    }

    return this.cashFlowRepository.update(id, data);
  }

  async delete(clerkUserId: string, id: string) {
    const transaction = await this.cashFlowRepository.findTransactionById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }

    const profile =
      await this.cashFlowRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    if (transaction.umkmProfileId !== profile.id) {
      throw new ForbiddenException('Access denied.');
    }

    await this.cashFlowRepository.delete(id);
  }

  async getSummary(clerkUserId: string, month: number, year: number) {
    const profile =
      await this.cashFlowRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    return this.cashFlowRepository.getSummary(profile.id, month, year);
  }

  async recalculateAllSummaries(clerkUserId: string) {
    const profile =
      await this.cashFlowRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    await this.cashFlowRepository.recalculateAllSummaries(profile.id);
  }
}
