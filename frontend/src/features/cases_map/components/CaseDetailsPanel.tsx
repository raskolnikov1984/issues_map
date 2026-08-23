import { Button } from '../../../components/ui/Button';
import type { CaseSummary } from '../services/casesApi';

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'full',
  timeStyle: 'short',
});

function caseImage(seed: string): string {
  return `https://picsum.photos/seed/${seed}/640/360`;
}

interface CaseDetailsPanelProps {
  caseItem: CaseSummary;
  onBack: () => void;
}

export function CaseDetailsPanel({ caseItem, onBack }: CaseDetailsPanelProps) {
  return (
    <article className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <header className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-snug text-primary">
          {caseItem.title}
        </h2>
        <Button variant="ghost" onClick={onBack} className="shrink-0 px-2">
          Volver
        </Button>
      </header>

      <img
        src={caseImage(caseItem.id)}
        alt={`Imagen del caso ${caseItem.title}`}
        loading="lazy"
        className="h-44 w-full rounded-xl border border-neutral-200 object-cover"
      />

      <div className="grid grid-cols-3 gap-2">
        {[2, 3, 4].map((variant) => (
          <img
            key={variant}
            src={caseImage(`${caseItem.id}-${variant}`)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-16 w-full rounded-lg border border-neutral-200 object-cover opacity-90"
          />
        ))}
      </div>

      <section>
        <h3 className="text-xs font-medium uppercase tracking-wide text-neutral-400">
          Descripción
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600">
          {caseItem.description || 'Sin descripción.'}
        </p>
      </section>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-neutral-200 p-4 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Fecha
          </dt>
          <dd className="mt-0.5 text-neutral-700">
            {dateFormatter.format(new Date(caseItem.createdAt))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Ubicación
          </dt>
          <dd className="mt-0.5 text-neutral-700">
            {caseItem.latitude.toFixed(5)}, {caseItem.longitude.toFixed(5)}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Identificador
          </dt>
          <dd className="mt-0.5 break-all font-mono text-xs text-neutral-500">
            {caseItem.id}
          </dd>
        </div>
      </dl>
    </article>
  );
}
