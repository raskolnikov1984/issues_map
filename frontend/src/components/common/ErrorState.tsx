import { Button } from "../ui/Button";

interface ErrorStateProps {
  title?: string;
  message?: string | null;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Algo salió mal",
  message,
  onRetry,
}: ErrorStateProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="animate-fade-in flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <div>
        <h3 className="text-sm font-semibold text-red-700">{title}</h3>
        <p className="mt-0.5 text-sm text-red-600">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="secondary"
          onClick={onRetry}
          className="px-3 py-1.5 text-xs"
        >
          Reintentar
        </Button>
      )}
    </div>
  );
}
