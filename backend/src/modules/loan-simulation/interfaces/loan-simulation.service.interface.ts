import type {
  CreateLoanSimulationInput,
  LoanSimulationResponse,
} from './loan-simulation.repository.interface.js';

export const ILoanSimulationService = Symbol('ILoanSimulationService');

export interface ILoanSimulationService {
  create(
    clerkUserId: string,
    data: CreateLoanSimulationInput,
  ): Promise<LoanSimulationResponse>;
  findAll(clerkUserId: string): Promise<LoanSimulationResponse[]>;
  findById(clerkUserId: string, id: string): Promise<LoanSimulationResponse>;
  delete(clerkUserId: string, id: string): Promise<void>;
}
