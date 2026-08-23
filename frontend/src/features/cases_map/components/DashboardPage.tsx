import { useEffect, useRef, useState } from 'react';
import { ErrorState } from '../../../components/common/ErrorState';
import { PinLoader } from '../../../components/common/PinLoader';
import { SuccessMessage } from '../../../components/common/SuccessMessage';
import { useToast } from '../../../components/common/toast/ToastContext';
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
  const { cases, isLoading, error, reload, loadedCount } = useCases();
  const { showToast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftLocation, setDraftLocation] = useState<GeoPoint | null>(null);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const notifiedLoadsRef = useRef(0);

  useEffect(() => {
    if (loadedCount <= notifiedLoadsRef.current) return;

    notifiedLoadsRef.current = loadedCount;
    if (loadedCount > 1) showToast('Casos actualizados');
  }, [loadedCount, showToast]);

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
        <Button
          variant="secondary"
          onClick={reload}
          loading={isLoading}
          className="px-3 py-1.5 text-xs"
        >
          Actualizar
        </Button>
      </header>

      {welcomeVisible && !error && (
        <SuccessMessage
          message={`Sesión iniciada como ${userEmail}`}
          onDismiss={() => setWelcomeVisible(false)}
        />
      )}

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : isLoading ? (
        <PinLoader label="Cargando casos…" />
      ) : (
        <CasePanel cases={cases} onSelect={selectCase} />
      )}
    </div>
  );

  return (
    <>
      <MapSplitLayout
        userEmail={userEmail}
        onSignOut={onSignOut}
        map={map}
        panel={panel}
      />
      {isLoading && loadedCount === 0 && (
        <PinLoader overlay label="Cargando casos…" />
      )}
    </>
  );
}
