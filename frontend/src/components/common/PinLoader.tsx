import { cn } from "../ui/cn";
import { MapPin } from "./MapPin";

type PinLoaderVariant = "bounce" | "pulse";

interface PinLoaderProps {
  label?: string;
  overlay?: boolean;
  variant?: PinLoaderVariant;
  pinColor?: string;
}

export function PinLoader({
  label = "Cargando…",
  overlay = false,
  variant = "bounce",
  pinColor = "var(--color-secondary)",
}: PinLoaderProps) {
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
          {variant === "bounce" && (
            <span
              aria-hidden="true"
              className="loader-ring absolute bottom-0 left-1/2 h-2.5 w-12 -translate-x-1/2 rounded-full bg-secondary/40"
            />
          )}
          <MapPin
            color={pinColor}
            className={cn(
              "relative z-10 h-12 w-auto",
              variant === "bounce"
                ? "animate-pin-bounce"
                : "pin-loader-pulse animate-pin-pulse",
            )}
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
