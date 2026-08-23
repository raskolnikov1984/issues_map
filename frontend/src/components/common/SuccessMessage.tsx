interface SuccessMessageProps {
  message?: string | null;
  onDismiss?: () => void;
}

export function SuccessMessage({ message, onDismiss }: SuccessMessageProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      className="animate-fade-in flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3"
    >
      <p className="text-sm font-medium text-emerald-700">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Descartar"
          className="shrink-0 text-xs font-semibold text-emerald-500 transition-colors hover:text-emerald-700"
        >
          ✕
        </button>
      )}
    </div>
  );
}
