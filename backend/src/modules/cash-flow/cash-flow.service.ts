import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICashFlowRepository } from './interfaces/cash-flow.repository.interface.js';
import type {
  CreateCashFlowInput,
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

  async getSummary(clerkUserId: string, month: number, year: number) {
    const profile =
      await this.cashFlowRepository.findUmkmProfileByClerkUserId(clerkUserId);

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    return this.cashFlowRepository.getSummary(profile.id, month, year);
  }
}
