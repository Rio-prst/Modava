export interface CampaignStats {
  total: number;
  active: number;
  totalAmountRaised: number;
}

export interface RecentPledge {
  id: string;
  amount: number;
  createdAt: Date;
}

export interface PledgeStats {
  total: number;
  recent: RecentPledge[];
}

export interface RecentTransaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  transactionDate: Date;
}

export interface MonthlySummaryInfo {
  totalIncome: number;
  totalExpense: number;
}

export interface CashFlowInfo {
  recentTransactions: RecentTransaction[];
  thisMonth: MonthlySummaryInfo | null;
}

export interface CreditScoreInfo {
  overallScore: number;
  tier: string;
}

export interface LegalitasStats {
  verified: number;
  total: number;
}

export interface DashboardData {
  campaigns: CampaignStats;
  pledges: PledgeStats;
  cashFlow: CashFlowInfo;
  creditScore: CreditScoreInfo | null;
  unreadNotifications: number;
  legalitas: LegalitasStats;
}

export const IDashboardRepository = Symbol('IDashboardRepository');

export interface IDashboardRepository {
  get(umkmProfileId: string, clerkUserId: string): Promise<DashboardData>;
}
