import { cn } from "../ui/cn";
import { MapPin } from "./MapPin";

interface PinLoaderProps {
  label?: string;
  overlay?: boolean;
}

export function PinLoader({ label = "Cargando…", overlay = false }: PinLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        overlay
          ? "fixed inset-0 z-50 grid place-items-center bg-primary/70 backdrop-blur-sm"
          : "grid place-items-center py-10"
      }
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex h-16 w-16 items-end justify-center">
          <span
            aria-hidden="true"
            className="loader-ring absolute bottom-0 left-1/2 h-2.5 w-12 -translate-x-1/2 rounded-full bg-secondary/40"
          />
          <MapPin
            color="var(--color-secondary)"
            className="relative z-10 h-12 w-auto animate-pin-bounce"
          />
        </div>
        <p
          className={cn(
            "text-sm font-medium",
            overlay ? "text-white/90" : "text-neutral-500",
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
