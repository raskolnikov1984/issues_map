import type { ReactNode } from 'react';
import { Button } from '../components/ui/Button';

interface SplitScreenLayoutProps {
  children: ReactNode;
  userEmail: string;
  onSignOut: () => void;
}

export function SplitScreenLayout({
  children,
  userEmail,
  onSignOut,
}: SplitScreenLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-surface to-primary p-10 text-white md:flex">
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-3xl"
        />

        <span className="relative text-lg font-semibold tracking-tight">
          Issues Map
        </span>

        <div className="relative">
          <span className="mb-4 block h-0.5 w-10 rounded-full bg-accent" />
          <h2 className="text-3xl font-semibold leading-tight">
            Gestiona tus casos sobre el mapa
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Visualiza el estado, crea nuevos casos y hazles seguimiento desde un
            único panel.
          </p>
        </div>

        <span className="relative text-xs text-white/40">
          © 2026 Issues Map
        </span>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <span className="text-sm font-semibold text-primary md:hidden">
            Issues Map
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-neutral-500 sm:inline">
              {userEmail}
            </span>
            <Button variant="ghost" onClick={onSignOut}>
              Cerrar sesión
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
