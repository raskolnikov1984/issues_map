# Issues Map

## Instancia de Desarrollo

### Construir Servicios

```bash
docker compose -f compose.test.yaml up -d
```

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

