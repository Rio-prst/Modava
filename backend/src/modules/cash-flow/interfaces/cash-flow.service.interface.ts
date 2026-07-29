import type {
  CreateCashFlowInput,
  UpdateCashFlowInput,
  CashFlowFilter,
  CashFlowTransactionResponse,
  MonthlySummary,
} from './cash-flow.repository.interface.js';

export const ICashFlowService = Symbol('ICashFlowService');

export interface ICashFlowService {
  create(
    clerkUserId: string,
    data: CreateCashFlowInput,
  ): Promise<CashFlowTransactionResponse>;
  findAll(
    clerkUserId: string,
    filter: CashFlowFilter,
  ): Promise<CashFlowTransactionResponse[]>;
  update(
    clerkUserId: string,
    id: string,
    data: UpdateCashFlowInput,
  ): Promise<CashFlowTransactionResponse>;
  delete(clerkUserId: string, id: string): Promise<void>;
  getSummary(
    clerkUserId: string,
    month: number,
    year: number,
  ): Promise<MonthlySummary>;
  recalculateAllSummaries(clerkUserId: string): Promise<void>;
}
