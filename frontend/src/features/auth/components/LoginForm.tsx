import { useState } from 'react';
import type { FormEvent } from 'react';
import { ErrorMessage } from '../../../components/common/ErrorMessage';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: FieldErrors = {};
    if (!email.trim()) {
      errors.email = 'El correo es obligatorio';
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = 'Introduce un correo válido';
    }
    if (!password) {
      errors.password = 'La contraseña es obligatoria';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onSubmit(email.trim(), password);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-neutral-700">
          Correo electrónico
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          value={email}
          aria-invalid={Boolean(fieldErrors.email)}
          onChange={(event) => setEmail(event.target.value)}
        />
        <ErrorMessage message={fieldErrors.email} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-neutral-700">
          Contraseña
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          aria-invalid={Boolean(fieldErrors.password)}
          onChange={(event) => setPassword(event.target.value)}
        />
        <ErrorMessage message={fieldErrors.password} />
      </div>

      <ErrorMessage message={error} />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Iniciando sesión…' : 'Iniciar sesión'}
      </Button>
    </form>
  );
}
