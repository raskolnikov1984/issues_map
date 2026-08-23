import { useState } from 'react';
import { ErrorMessage } from '../../../components/common/ErrorMessage';
import { Button } from '../../../components/ui/Button';
import { MapSplitLayout } from '../../../layout/MapSplitLayout';
import { useCases } from '../hooks/useCases';
import { CaseDetailsPanel } from './CaseDetailsPanel';
import { CasePanel } from './CasePanel';
import { MapView } from './MapView';
import type { GeoPoint } from './MapView';

interface DashboardPageProps {
  userEmail: string;
  onSignOut: () => void;
}

export function DashboardPage({ userEmail, onSignOut }: DashboardPageProps) {
  const { cases, isLoading, error, reload } = useCases();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftLocation, setDraftLocation] = useState<GeoPoint | null>(null);

  const selectedCase = cases.find((item) => item.id === selectedId) ?? null;

  function selectCase(id: string) {
    setSelectedId(id);
    setDraftLocation(null);
  }

  const map = (
    <MapView
      cases={cases}
      selectedId={selectedId}
      draftLocation={draftLocation}
      onSelectCase={selectCase}
      onPickLocation={(point) => {
        setSelectedId(null);
        setDraftLocation(point);
      }}
    />
  );

  const panel = selectedCase ? (
    <CaseDetailsPanel caseItem={selectedCase} onBack={() => setSelectedId(null)} />
  ) : (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-primary">
            Casos
          </h1>
          <p className="text-xs text-neutral-500">
            {isLoading ? 'Cargando…' : `${cases.length} registrados`}
          </p>
        </div>
        <Button variant="secondary" onClick={reload} disabled={isLoading} className="px-3 py-1.5 text-xs">
          Actualizar
        </Button>
      </header>

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((row) => (
            <div key={row} className="h-24 animate-pulse rounded-xl bg-neutral-100" />
          ))}
        </div>
      ) : (
        <CasePanel cases={cases} onSelect={selectCase} />
      )}

      {draftLocation && (
        <footer className="sticky bottom-0 mt-auto rounded-xl border border-accent/40 bg-accent/10 p-3">
          <p className="text-xs font-medium text-neutral-700">
            Ubicación seleccionada: {draftLocation.latitude.toFixed(5)},{' '}
            {draftLocation.longitude.toFixed(5)}
          </p>
          <button
            type="button"
            disabled
            className="mt-2 w-full cursor-not-allowed rounded-md bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary/60"
          >
            Crear caso aquí (próximamente)
          </button>
        </footer>
      )}
    </div>
  );

  return (
    <MapSplitLayout userEmail={userEmail} onSignOut={onSignOut} map={map} panel={panel} />
  );
}
