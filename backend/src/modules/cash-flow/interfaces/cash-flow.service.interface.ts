import type {
  CreateCashFlowInput,
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
  getSummary(
    clerkUserId: string,
    month: number,
    year: number,
  ): Promise<MonthlySummary>;
}
