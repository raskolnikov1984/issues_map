interface ErrorMessageProps {
  message?: string | null;
  tone?: 'dark' | 'light';
}

export function ErrorMessage({ message, tone = 'dark' }: ErrorMessageProps) {
  if (!message) return null;

  const toneClasses =
    tone === 'light'
      ? 'text-red-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
      : 'text-red-600';

  return (
    <p role="alert" className={`text-sm font-medium ${toneClasses}`}>
      {message}
    </p>
  );
}
