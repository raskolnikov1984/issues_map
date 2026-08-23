import { useCallback, useState } from "react";
import type { AuthResponse } from "../services/authApi";

const STORAGE_KEY = "cases_map.user";

function readStoredUser(): AuthResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthResponse) : null;
  } catch {
    return null;
  }
}

interface UseSessionResult {
  user: AuthResponse | null;
  signIn: (user: AuthResponse) => void;
  signOut: () => void;
}

export function useSession(): UseSessionResult {
  const [user, setUser] = useState<AuthResponse | null>(readStoredUser);

  const signIn = useCallback((authenticated: AuthResponse) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticated));
    setUser(authenticated);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, signIn, signOut };
}
