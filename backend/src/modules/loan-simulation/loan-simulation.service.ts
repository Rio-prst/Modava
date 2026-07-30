import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ILoanSimulationRepository } from './interfaces/loan-simulation.repository.interface.js';
import type { CreateLoanSimulationInput } from './interfaces/loan-simulation.repository.interface.js';
import { ILoanSimulationService } from './interfaces/loan-simulation.service.interface.js';

@Injectable()
export class LoanSimulationService implements ILoanSimulationService {
  constructor(
    @Inject(ILoanSimulationRepository)
    private readonly loanSimulationRepository: ILoanSimulationRepository,
  ) {}

  async create(clerkUserId: string, data: CreateLoanSimulationInput) {
    const profile =
      await this.loanSimulationRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException(
        'UMKM profile not found. Create profile first.',
      );
    }

    return this.loanSimulationRepository.create(profile.id, data);
  }

  async findAll(clerkUserId: string) {
    const profile =
      await this.loanSimulationRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    return this.loanSimulationRepository.findAllByUmkmProfileId(profile.id);
  }

  async findById(clerkUserId: string, id: string) {
    const profile =
      await this.loanSimulationRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const simulation = await this.loanSimulationRepository.findById(id);

    if (!simulation) {
      throw new NotFoundException('Loan simulation not found.');
    }

    if (simulation.umkmProfileId !== profile.id) {
      throw new NotFoundException('Loan simulation not found.');
    }

    return simulation;
  }

  async delete(clerkUserId: string, id: string) {
    const profile =
      await this.loanSimulationRepository.findUmkmProfileByClerkUserId(
        clerkUserId,
      );

    if (!profile) {
      throw new NotFoundException('UMKM profile not found.');
    }

    const simulation = await this.loanSimulationRepository.findById(id);

    if (!simulation) {
      throw new NotFoundException('Loan simulation not found.');
    }

    if (simulation.umkmProfileId !== profile.id) {
      throw new NotFoundException('Loan simulation not found.');
    }

    await this.loanSimulationRepository.delete(id);
  }
}
