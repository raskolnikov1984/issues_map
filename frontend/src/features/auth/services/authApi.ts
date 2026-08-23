export interface AuthResponse {
  id: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 401) {
    throw new Error('Credenciales inválidas');
  }

  if (!response.ok) {
    throw new Error('Error del servidor, intenta de nuevo');
  }

  return response.json() as Promise<AuthResponse>;
}
