export interface CaseSummary {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface FetchCasesOptions {
  page?: number;
  limit?: number;
}

export async function fetchCases({
  page = 1,
  limit = 50,
}: FetchCasesOptions = {}): Promise<CaseSummary[]> {
  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  const response = await fetch(`${API_URL}/cases?${query.toString()}`);

  if (!response.ok) {
    throw new Error('No se pudieron cargar los casos');
  }

  return response.json() as Promise<CaseSummary[]>;
}
