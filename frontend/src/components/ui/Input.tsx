import type { InputHTMLAttributes } from 'react';
import { cn } from './cn';

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
        className,
      )}
      {...props}
    />
  );
}
