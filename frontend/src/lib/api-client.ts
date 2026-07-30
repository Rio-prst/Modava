// API Client & Service Layer for Modava Frontend
// Integrates with NestJS Backend (http://localhost:4000) with automatic Fallback Mode

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Fetch wrapper for NestJS API endpoints with Bearer Auth Token & Fallback
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    const data = json.data !== undefined ? json.data : json;
    return { success: true, data };
  } catch (error) {
    console.warn(`[Modava API Fallback] ${endpoint} request failed or backend offline. Using mock data fallback.`);
    return {
      success: false,
      data: getMockDataFallback<T>(endpoint),
      message: (error as Error).message,
    };
  }
}

/**
 * Helper Functions for Specific Modules
 */

// Cash Flow API
export async function fetchCashFlowTransactions(token?: string | null) {
  return apiFetch<Record<string, unknown>[] | unknown[]>("/cash-flow/transactions", { method: "GET" }, token);
}

export async function createCashFlowTransaction(
  payload: { type: "INCOME" | "EXPENSE"; amount: number; category: string; date: string; notes?: string },
  token?: string | null
) {
  return apiFetch<Record<string, unknown>>("/cash-flow/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  }, token);
}

export async function removeCashFlowTransaction(id: string, token?: string | null) {
  return apiFetch<Record<string, unknown>>(`/cash-flow/transactions/${id}`, { method: "DELETE" }, token);
}

// Credit Score API
export async function fetchCreditScore(token?: string | null) {
  return apiFetch<Record<string, unknown>>("/credit-score", { method: "GET" }, token);
}

export async function recalculateCreditScore(token?: string | null) {
  return apiFetch<Record<string, unknown>>("/credit-score/recalculate", { method: "POST" }, token);
}

// Campaigns API
export async function fetchPublicCampaigns(filters?: Record<string, string>) {
  const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : "";
  return apiFetch<Record<string, unknown>[]>(`/campaigns${queryParams}`, { method: "GET" });
}

export async function fetchPublicCampaignById(id: string) {
  return apiFetch<Record<string, unknown>>(`/campaigns/public/${id}`, { method: "GET" });
}

// Legalitas API
export async function fetchLegalitasDocuments(token?: string | null) {
  return apiFetch<Record<string, unknown>[]>(`/legalitas/documents`, { method: "GET" }, token);
}

export async function calculateUMKMTax(omzet: number) {
  return apiFetch<{ omzet: number; pphFinalRate: number; taxAmount: number }>(
    "/legalitas/tax-calculator",
    {
      method: "POST",
      body: JSON.stringify({ omzet }),
    }
  );
}

/**
 * Mock Data Fallback Generator for demo reliability
 */
function getMockDataFallback<T>(endpoint: string): T {
  if (endpoint.includes("/cash-flow")) {
    return [
      { id: "tx-1", date: "2026-07-28", type: "INCOME", category: "Penjualan Kopi", amount: 4500000, notes: "Katering Kantor BUMN" },
      { id: "tx-2", date: "2026-07-27", type: "EXPENSE", category: "Bahan Baku Biji", amount: 1200000, notes: "Biji Kopi Arabika 20kg" },
      { id: "tx-3", date: "2026-07-25", type: "INCOME", category: "Penjualan Harian", amount: 2100000, notes: "Omzet Kedai" },
    ] as unknown as T;
  }

  if (endpoint.includes("/credit-score")) {
    return {
      score: 845,
      gpa: "3.75",
      tier: "A",
      meaning: "Sangat Layak",
      breakdown: {
        cashFlow: 88,
        legalitas: 90,
        platformHistory: 75,
      },
    } as unknown as T;
  }

  if (endpoint.includes("/campaigns")) {
    return [
      {
        id: "c-1",
        title: "Warung Kopi Nadi - Cabang Ke-3",
        targetAmount: 25000000,
        currentAmount: 19500000,
        daysLeft: 12,
        status: "ACTIVE",
      },
    ] as unknown as T;
  }

  if (endpoint.includes("/tax-calculator")) {
    return { omzet: 10000000, pphFinalRate: 0.005, taxAmount: 50000 } as unknown as T;
  }

  return {} as unknown as T;
}
