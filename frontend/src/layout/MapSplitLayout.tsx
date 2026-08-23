import type { ReactNode } from "react";
import { Button } from "../components/ui/Button";

interface MapSplitLayoutProps {
  userEmail: string;
  onSignOut: () => void;
  map: ReactNode;
  panel: ReactNode;
}

export function MapSplitLayout({
  userEmail,
  onSignOut,
  map,
  panel,
}: MapSplitLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between bg-primary px-6 py-3 text-white">
        <span className="text-lg font-semibold tracking-tight">Cases Map</span>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-white/70 sm:inline">
            {userEmail}
          </span>
          <Button
            variant="ghost"
            onClick={onSignOut}
            className="text-white hover:bg-white/10"
          >
            Cerrar sesión
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <section className="relative min-h-[50vh] flex-1 md:min-h-0">
          {map}
        </section>
        <aside className="w-full shrink-0 overflow-hidden border-t border-neutral-200 bg-white md:w-96 md:border-l md:border-t-0">
          {panel}
        </aside>
      </div>
    </div>
  );
}
