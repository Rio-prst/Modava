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

    const data = await res.json();
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
 * Mock Data Fallback Generator for demo reliability
 */
function getMockDataFallback<T>(endpoint: string): T {
  if (endpoint.includes("/cash-flow")) {
    return [
      { id: "tx-1", date: "2026-07-28", type: "in", category: "Penjualan Kopi", amount: 4500000, notes: "Katering Kantor BUMN" },
      { id: "tx-2", date: "2026-07-27", type: "out", category: "Bahan Baku Biji", amount: 1200000, notes: "Biji Kopi Arabika 20kg" },
      { id: "tx-3", date: "2026-07-25", type: "in", category: "Penjualan Harian", amount: 2100000, notes: "Omzet Kedai" },
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

  if (endpoint.includes("/crowdfunding")) {
    return [
      {
        id: "c-1",
        title: "Warung Kopi Nadi - Cabang Ke-3",
        target: 25000000,
        collected: 19500000,
        daysLeft: 12,
      },
    ] as unknown as T;
  }

  return {} as unknown as T;
}
