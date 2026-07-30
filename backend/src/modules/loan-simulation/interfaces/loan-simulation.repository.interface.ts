export interface CreateLoanSimulationInput {
  amount: number;
  tenor: number;
}

export interface LoanSimulationResponse {
  id: string;
  umkmProfileId: string;
  amount: number;
  tenor: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  createdAt: Date;
}

export interface LocalUmkmProfile {
  id: string;
}

export const ILoanSimulationRepository = Symbol('ILoanSimulationRepository');

export interface ILoanSimulationRepository {
  findUmkmProfileByClerkUserId(
    clerkUserId: string,
  ): Promise<LocalUmkmProfile | null>;
  create(
    umkmProfileId: string,
    data: CreateLoanSimulationInput,
  ): Promise<LoanSimulationResponse>;
  findAllByUmkmProfileId(
    umkmProfileId: string,
  ): Promise<LoanSimulationResponse[]>;
  findById(id: string): Promise<LoanSimulationResponse | null>;
  delete(id: string): Promise<void>;
}
