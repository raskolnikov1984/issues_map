import type { CaseSummary } from '../services/casesApi';

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

interface CasePanelProps {
  cases: CaseSummary[];
}

export function CasePanel({ cases }: CasePanelProps) {
  if (cases.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-400">
        No hay casos registrados todavía.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {cases.map((item) => (
        <li
          key={item.id}
          className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-primary">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                {item.description}
              </p>
            </div>
            <span
              title={item.id}
              className="shrink-0 rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium text-primary"
            >
              #{item.id.slice(0, 8)}
            </span>
          </div>

          <footer className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span>{dateFormatter.format(new Date(item.createdAt))}</span>
            <span aria-hidden="true">·</span>
            <span>
              {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
            </span>
          </footer>
        </li>
      ))}
    </ul>
  );
}
