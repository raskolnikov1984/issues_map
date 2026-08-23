import type { AuthResponse } from '../services/authApi';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm';

interface LoginPageProps {
  onAuthenticated: (user: AuthResponse) => void;
}

export function LoginPage({ onAuthenticated }: LoginPageProps) {
  const { authenticate, error, isLoading } = useAuth();

  async function handleSubmit(email: string, password: string) {
    const user = await authenticate(email, password);
    if (user) onAuthenticated(user);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-primary px-4">
      <section className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <header className="mb-6 flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-primary">
            Issues Map
          </h1>
          <span className="h-0.5 w-10 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-sm text-neutral-500">
            Inicia sesión para gestionar tus casos
          </p>
        </header>

        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

        <p className="mt-6 rounded-md bg-neutral-100 px-3 py-2 text-xs text-neutral-500">
          Demo · admin@issuesmap.com / admin123
        </p>
      </section>
    </main>
  );
}
