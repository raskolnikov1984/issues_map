import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../../ui/cn";
import { ToastContext } from "./ToastContext";
import type { Toast, ToastVariant } from "./ToastContext";

const AUTO_DISMISS_MS = 4000;
const MAX_VISIBLE_TOASTS = 3;

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: number) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      className={cn(
        "animate-toast-in pointer-events-auto flex w-full items-start justify-between gap-3 rounded-lg px-4 py-3 shadow-lg ring-1",
        toast.variant === "success"
          ? "bg-emerald-600 text-white ring-emerald-500/40"
          : "bg-red-600 text-white ring-red-500/40",
      )}
    >
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Cerrar notificación"
        className="shrink-0 text-white/70 transition-colors hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextIdRef = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = nextIdRef.current++;

      setToasts((current) => [
        ...current.slice(-(MAX_VISIBLE_TOASTS - 1)),
        { id, message, variant },
      ]);
      window.setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed left-1/2 top-4 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
