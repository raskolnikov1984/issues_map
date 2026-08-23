interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p role="alert" className="text-sm font-medium text-red-600">
      {message}
    </p>
  );
}
