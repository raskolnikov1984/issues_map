const DEFAULT_ORIGINS = ['http://localhost:5173', 'http://localhost:3000'];

export function parseCorsOrigins(raw?: string): string[] | true {
  const origins = (raw ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.includes('*')) {
    return true;
  }

  if (origins.length === 0) {
    return DEFAULT_ORIGINS;
  }

  return origins;
}
