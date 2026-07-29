export interface UpdateCashFlowInput {
  type?: 'INCOME' | 'EXPENSE';
  amount?: number;
  description?: string;
  category?: string;
  transactionDate?: string;
}

export interface CreateCashFlowInput {
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  category?: string;
  transactionDate: string;
}

export interface CashFlowTransactionResponse {
  id: string;
  umkmProfileId: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  category: string | null;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CashFlowFilter {
  month?: number;
  year?: number;
  type?: 'INCOME' | 'EXPENSE';
}

export interface MonthlySummary {
  month: number;
  year: number;
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  transactionCount: number;
}

export interface LocalUmkmProfile {
  id: string;
  userId: string;
}

export const ICashFlowRepository = Symbol('ICashFlowRepository');

export interface ICashFlowRepository {
  findUmkmProfileByClerkUserId(
    clerkUserId: string,
  ): Promise<LocalUmkmProfile | null>;
  create(
    umkmProfileId: string,
    data: CreateCashFlowInput,
  ): Promise<CashFlowTransactionResponse>;
  findAll(
    umkmProfileId: string,
    filter: CashFlowFilter,
  ): Promise<CashFlowTransactionResponse[]>;
  findTransactionById(id: string): Promise<CashFlowTransactionResponse | null>;
  update(
    id: string,
    data: UpdateCashFlowInput,
  ): Promise<CashFlowTransactionResponse>;
  delete(id: string): Promise<void>;
  getSummary(
    umkmProfileId: string,
    month: number,
    year: number,
  ): Promise<MonthlySummary>;
  recalculateAllSummaries(umkmProfileId: string): Promise<void>;
}
