import { useCallback, useEffect, useState } from 'react';
import type { CaseSummary } from '../services/casesApi';
import { fetchCases } from '../services/casesApi';

interface UseCasesResult {
  cases: CaseSummary[];
  isLoading: boolean;
  error: string | null;
  loadedCount: number;
  reload: () => void;
}

export function useCases(): UseCasesResult {
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchCases();
        if (!cancelled) {
          setCases(result);
          setLoadedCount((count) => count + 1);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error inesperado');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  return { cases, isLoading, error, loadedCount, reload };
}
