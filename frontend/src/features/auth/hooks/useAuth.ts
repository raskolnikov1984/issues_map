import { useCallback, useState } from 'react';
import type { AuthResponse } from '../services/authApi';
import { login } from '../services/authApi';

interface UseAuthResult {
  user: AuthResponse | null;
  error: string | null;
  isLoading: boolean;
  authenticate: (email: string, password: string) => Promise<AuthResponse | null>;
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = useCallback(
    async (email: string, password: string): Promise<AuthResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const authenticated = await login(email, password);
        setUser(authenticated);
        return authenticated;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error inesperado');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { user, error, isLoading, authenticate };
}
