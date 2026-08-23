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
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-primary via-surface to-primary px-4">
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-surface/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
      />

      <section className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-primary/60 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
        <header className="mb-6 flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Issues Map
          </h1>
          <span
            className="h-0.5 w-10 rounded-full bg-accent"
            aria-hidden="true"
          />
          <p className="text-sm text-white/60">
            Inicia sesión para gestionar tus casos
          </p>
        </header>

        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

        <p className="mt-6 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-white/50">
          Demo · admin@issuesmap.com / admin123
        </p>
      </section>
    </main>
  );
}
