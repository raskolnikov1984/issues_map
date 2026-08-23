import { ErrorMessage } from '../../../components/common/ErrorMessage';
import { Button } from '../../../components/ui/Button';
import { useCases } from '../hooks/useCases';
import { CasePanel } from './CasePanel';

export function DashboardPage() {
  const { cases, isLoading, error, reload } = useCases();

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-primary">
            Casos
          </h1>
          <p className="text-sm text-neutral-500">
            Resumen de los casos registrados en el sistema
          </p>
        </div>
        <Button variant="secondary" onClick={reload} disabled={isLoading}>
          {isLoading ? 'Cargando…' : 'Actualizar'}
        </Button>
      </header>

      <article className="rounded-xl bg-gradient-to-br from-primary to-surface p-5 text-white shadow-sm sm:max-w-xs">
        <p className="text-xs uppercase tracking-wide text-white/60">Total</p>
        <p className="mt-1 text-3xl font-semibold">
          {isLoading ? '—' : cases.length}
        </p>
      </article>

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <div className="h-24 animate-pulse rounded-xl bg-neutral-100" />
      ) : (
        <CasePanel cases={cases} />
      )}
    </section>
  );
}
