import type { ReactNode } from "react";
import { MapPin } from "./MapPin";

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="animate-fade-in flex flex-col items-center gap-2 rounded-xl border border-dashed border-neutral-300 p-8 text-center">
      <MapPin
        color="#D1D5DB"
        strokeColor="#F3F4F6"
        className="h-9 w-auto opacity-80"
      />
      <h3 className="text-sm font-semibold text-neutral-600">{title}</h3>
      {message && <p className="max-w-xs text-sm text-neutral-400">{message}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
