# Architecture Decision Record

## 1. Backend.

### 1.1. Enfoque Arquitectónico: Domain-Driven Design (DDD)

Se adopta una arquitectura orientada al dominio (DDD) aplicando principios de Arquitectura Limpia (Hexagonal).
* **Motivación:** Desacoplar la lógica central del negocio de frameworks externos, bases de datos o clientes HTTP.
* **Lenguaje Ubicuo:** Establecer un modelo mental y un glosario unificado entre desarrolladores y expertos del dominio desde el inicio del proyecto.
* **Estrategia:** Las entidades de dominio serán puras y desacopladas de la persistencia mediante el patrón *Data Mapper*.

### 1.2. Stack Tecnológico

* **TypeScript:** Aporta seguridad de tipos en tiempo de compilación, autocompletado avanzado y reduce errores en tiempo de ejecución.
* **NestJS:** Proporciona una estructura modular estandarizada, inyección de dependencias nativa y excelente soporte para arquitectura RESTful y comunicación en tiempo real (WebSockets / Server-Sent Events).
* **TypeORM:** Facilita el mapeo objeto-relacional (ORM), el control de versiones de la base de datos mediante migraciones y la abstracción de consultas SQL.
  * **Consideración de diseño:** Se utilizará de forma aislada en la capa de Infraestructura para evitar la fuga de anotaciones de ORM hacia las entidades del Dominio.

### 1.3. Architectura de Carpetas

```
src/
├── auth/                               # Subdominio Genérico de Autenticación
│   ├── domain/
│   │   ├── entities/                   # Entidad User (pura, sin TypeORM)
│   │   └── ports/                      # IAuthService, IUserRepository (interfaces)
│   ├── application/
│   │   └── use-cases/                  # LoginUseCase (orquesta lógica de negocio)
│   └── infrastructure/
│       ├── adapters/                   # TypeORMUserRepository (persistencia)
│       ├── controllers/                # AuthController (puntos de entrada REST)
│       └── dtos/                       # LoginDto, AuthResponseDto
│
├── cases/                              # Subdominio de Casos (Mapa e Info)
│   ├── domain/
│   │   ├── entities/                   # Case (Entidad principal / Aggregate Root)
│   │   ├── value-objects/              # Coordinate (VO inmutable para latitud/longitud)
│   │   └── ports/                      # ICaseRepository (puerto de salida)
│   ├── application/
│   │   └── use-cases/                  # GetCasesUseCase, GetCaseDetailsUseCase
│   └── infrastructure/
│       ├── adapters/                   # TypeORMCaseRepository (acceso a base de datos real)
│       ├── controllers/                # CasesController (HTTP endpoints)
│       ├── schemas/                    # Schemas de TypeORM (mapeo físico de la BD)
│       └── dtos/                       # QueryParamsDto, CaseResponseDto
│
├── shared/                             # Lógica compartida y de soporte (filtros, middlewares)
└── main.ts                             # Entrada de la aplicación NestJS
```

---

## 2. Frontend

### 2.1. Enfoque Arquitectónico: Feature-Driven Design
Organización del código por dominios funcionales (features) en lugar de por tipo de archivo, garantizando alta cohesión y bajo acoplamiento.

### 2.2. Stack Tecnológico

* **React + TypeScript:** Permite construir interfaces declarativas, compuestas por componentes reutilizables y tipados. Garantiza que las propiedades (props) y estados tengan estructuras válidas.
* **React-Leaflet:** Proporciona abstracciones en componentes de React para Leaflet.js, permitiendo renderizar mapas interactivos, capas de geometría y marcadores geográficos de forma eficiente.
* **Gestión de Estado (TanStack Query + Zustand):**
  * **TanStack Query:** Para la gestión, caché y sincronización del estado del servidor (peticiones API).
  * **Zustand:** Para el estado local o UI global de la aplicación (ej. estado de capas del mapa, filtros activos).

### 2.3. Estructura de Carpetas

```
frontend/
├── src/
│   ├── assets/                   # Imágenes, logos
│   ├── components/               # Componentes UI reutilizables (Botones, Inputs, Modales)
│   │   ├── ui/
│   │   └── common/
│   ├── features/                 # Módulos de la aplicación
│   │   ├── auth/
│   │   │   ├── components/       # LoginForm.tsx
│   │   │   └── hooks/            # useAuth.ts (manejo de estados de error/éxito)
│   │   └── cases_map/
│   │       ├── components/       # MapView.tsx (Leaflet), CasePanel.tsx, StatusStates.tsx
│   │       └── services/         # Llamadas a la API del backend
│   ├── layout/                   # Layout de vista dividida (Split Screen)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Configuración de Tailwind con colores institucionales
├── Dockerfile
├── package.json
└── vite.config.ts
```

---

### 3. Despliegue e Infraestructura

* **Docker & Docker Compose:** Estandarización del entorno de desarrollo. Garantiza la paridad entre entornos (Desarrollo/Staging/Producción), encapsula dependencias del sistema operativo y simplifica la incorporación de nuevos desarrolladores al proyecto.

### 4. Seguridad:

+ Para el prototipo usar algoritmo `SHA-256` en el futuro, modificar a bcrypt para no agregar dependencias al inicio.

+ React-Router en el futuro.

