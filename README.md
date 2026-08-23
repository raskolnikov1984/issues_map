# Issues Map

## Instancia de Desarrollo

### Construir Servicios

```bash
docker compose -f compose.test.yaml up -d
```

Levanta PostgreSQL, la API del backend en `localhost:3000` (repositorio `postgres`, migraciones automáticas y hot-reload de `backend/src`) y el frontend en `localhost:5173` con hot-reload de `frontend/src`.

El frontend consume la API mediante la variable `VITE_API_URL` (por defecto `http://localhost:3000`); los orígenes permitidos por CORS se configuran con `CORS_ORIGINS` en el backend.

### Eliminar Servicios

```bash
docker compose -f compose.test.yaml down -vv
```

## Backend

### Repositorio de Persistencia

El backend permite escoger entre repositorio en memoria y PostgreSQL mediante la variable `REPOSITORY`:

| Valor | Descripción |
| --- | --- |
| `memory` (default) | `InMemoryCaseRepository`, no requiere base de datos |
| `postgres` | `PostgresCaseRepository`, aplica migraciones al arrancar |

```bash
REPOSITORY=postgres npm run start:dev
```

La conexión se configura con las variables `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD` y `POSTGRES_DB` (ver `backend/.env.example`; los valores por defecto coinciden con `compose.test.yaml`).

### CORS

Los orígenes permitidos se configuran con `CORS_ORIGINS` (separados por coma; el comodín `*` permite todos). Por defecto se permiten `http://localhost:5173` y `http://localhost:3000`:

```bash
CORS_ORIGINS="https://app.example.com" npm run start:dev
```

### Migraciones

```bash
npm run migration:run       # aplicar migraciones pendientes
npm run migration:revert    # revertir la última migración
npm run migration:generate -- <NombreMigracion>   # generar desde cambios de schemas
```

### Tests

```bash
npm test                    # tests unitarios
RUN_DB_TESTS=true npm run test:integration   # integración contra Postgres (requiere el contenedor arriba)
```

