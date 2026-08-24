# Evaluación de Criterio Técnico

## Escalabilidad y Arquitectura

### 1. Escalabilidad y cambios arquitectónicos

*Si esta maqueta evolucionara a una aplicación productiva utilizada por miles de usuarios concurrentes, ¿qué cambios arquitectónicos propondría y por qué?*

Este proyecto fue diseñado desde el primer momento siguiendo los principios de Domain-Driven Design (DDD) y Clean Architecture, estructurado como un monolito modular con fronteras definidas y desacopladas entre los diferentes contextos de negocio (como Auth y Cases). Esta estructura evita tener que reescribir el software desde cero y permite una ruta de evolución fluida hacia sistemas distribuidos.

Para soportar miles de usuarios concurrentes de forma eficiente, propongo los siguientes cambios arquitectónicos e infraestructurales:

**Transición de monolito modular a microservicios.** Extraer los contextos delimitados independientes (por ejemplo, el módulo geoespacial de Cases) hacia microservicios aislados que se comuniquen mediante patrones asíncronos orientados a eventos. Así se aíslan los dominios de alta carga (como consultas de mapas y reportes de incidencias en tiempo real) de los módulos de menor tráfico, evitando la contención de recursos.

**Infraestructura y orquestación (Kubernetes).** Migrar los contenedores (API de NestJS y frontend en Nginx) desde un VPS tradicional hacia clústeres administrados de Kubernetes (K8s) (por ejemplo, AWS EKS o Hetzner). Esto permite el autoescalado horizontal de pods (HPA) basado en métricas de CPU, memoria y throughput de peticiones entrantes durante las horas pico.

**Procesamiento asíncrono y concurrencia (event-driven).** Introducir un message broker (como RabbitMQ, Kafka o AWS SQS/SNS) combinado con funciones serverless (AWS Lambda) para tareas pesadas en segundo plano (como cargas masivas de casos o cálculos geoespaciales complejos). De esta manera se evita bloquear el pool de hilos principal de peticiones HTTP de la API, protegiendo el pool de conexiones a la base de datos.

**Capas de caché y optimización del throughput.** Implementar una capa de caché distribuida utilizando Redis entre la API y PostgreSQL para almacenar consultas geográficas frecuentes, límites de mapas (bounding boxes) y sesiones de usuario. Esto reduce drásticamente la latencia de lectura, alivia la carga de CPU en la base de datos y maximiza el throughput general del sistema.

**Pipelines de CI/CD automatizados.** Establecer workflows robustos de integración y despliegue continuo (usando GitHub Actions u otras alternativas) con pruebas automatizadas (TDD), escaneo de seguridad en contenedores, actualizaciones sin interrupciones en Kubernetes e implementación de infraestructura como código (IaC) para maximizar la entrega continua. Para esto se pueden usar herramientas como Ansible y Terraform.

### 2. Estructura frontend/backend para mantenibilidad

*¿Cómo estructuraría el frontend y el backend para garantizar mantenibilidad y crecimiento a largo plazo?*

**En el frontend (Feature-Sliced + Atomic Web Design + Composition):**

El código del cliente se organiza en carpetas centradas en dominios de negocio o funcionalidades (`features/auth`, `features/dashboard`), evitando el acoplamiento masivo en carpetas genéricas de componentes, siguiendo el patrón Feature-Driven.

Continúo aplicando Atomic Web Design y Component Composition, ya que de esta manera se estructuran los componentes desde los elementos más atómicos (botones, inputs, estados de carga y error) hasta organismos complejos (como la vista dividida del mapa y el panel lateral), utilizando la composición de componentes para mantener interfaces limpias, reutilizables y altamente testeables.

### 3. Optimización del mapa con miles de casos

*¿Qué estrategias implementaría para optimizar el rendimiento del mapa si el sistema tuviera miles de casos georreferenciados?*

- Delimitar la consulta de los puntos a la región que el usuario escoja: búsqueda radial o búsqueda por división de áreas en ciudades como Medellín, con la posibilidad de cargar información por comunas.
- En lugar de cargar todos los casos de la base de datos, el frontend envía dinámicamente las coordenadas geográficas de los límites actuales del mapa.
- Se implementó la librería Leaflet.markercluster, que agrupa los pines cercanos en un solo indicador cuando el nivel de zoom está alejado, desagrupándolos conforme el usuario se acerca.
- Utilizar extensiones avanzadas como PostGIS en PostgreSQL.

## Gestión Técnica y Organización del Trabajo

### 4. Organización de un equipo de 3–5 desarrolladores

*Si liderara un equipo de 3 a 5 desarrolladores para construir esta aplicación en un entorno real, ¿cómo organizaría el trabajo (metodología, división de tareas, revisiones de código, entregables, etc.)?*

Buscaría trabajar bajo un marco ágil híbrido (Scrum con prácticas de eXtreme Programming como pair programming y tableros Kanban para flujo continuo). Esto permitiría combinar el trabajo individual con la responsabilidad compartida, aprovechando los ciclos de retroalimentación de Scrum y la colaboración por pares, que permite abordar una solución desde múltiples puntos de vista.

Para la gestión y división de tareas propondría el uso de herramientas de gestión (Jira, Trello u OpenProject). La división de tareas se basaría en las fortalezas individuales del equipo, fomentando el trabajo colaborativo para el crecimiento técnico mutuo.

Para las revisiones de código aplicaría control estricto mediante pull requests respaldados por validaciones automáticas (linters, analizadores estáticos de código, herramientas de IA) y revisiones cruzadas por pares.

Trabajando bajo Scrum, al finalizar cada sprint se esperarían incrementos de producto funcionales, cumpliendo estrictamente con los objetivos de negocio y de calidad definidos previamente.

### 5. Calidad de código y deuda técnica

*¿Qué prácticas implementaría para garantizar calidad del código y reducir deuda técnica?*

Para garantizar la calidad del código y mitigar la deuda técnica se requiere un enfoque que comience con un riguroso levantamiento de requerimientos claros, que traduzca con precisión las necesidades del negocio y prevenga ambigüedades que generen reprocesos. Asimismo, implementaría Test-Driven Development (TDD) para asegurar que cada componente nazca testeado y modular, abarcando pruebas unitarias, de integración y end-to-end.

Este código robusto se valida de manera automatizada mediante pipelines de CI/CD equipados con linters y analizadores estáticos que detectan anomalías tempranamente, reduciendo el costo de corrección. Complementariamente, una cultura de code reviews rigurosas y de entrenamiento continuo transforma la revisión técnica en un espacio de mentoría y estandarización.

En el centro de todo este engranaje se encuentra el accountability y una cultura de mejora continua, donde cada desarrollador se asume como parte del producto, asegurando que la mantenibilidad y la excelencia técnica sean valores inquebrantables del equipo.

## Toma de Decisiones

### 6. Criterios de elección tecnológica (mapa)

*Si existieran dos propuestas tecnológicas distintas para implementar el mapa (por ejemplo, Google Maps vs. Leaflet), ¿qué criterios utilizaría para tomar la decisión final?*

Para el desarrollo de este proyecto, la elección entre Google Maps y Leaflet se resolvió aplicando los siguientes criterios clave:

- **Alineación con el subdominio y los requerimientos:** el alcance de la prueba requería una visualización limpia y directa de incidencias geoespaciales, sin la sobreingeniería ni los costos asociados a SDKs comerciales masivos, lo que hacía de Leaflet una opción ligera y altamente personalizable.
- **Costo económico:** se priorizó una solución libre de costos o tarifas de consumo por visualización, lo cual garantiza escalabilidad financiera.
- **Soporte y comunidad:** Leaflet cuenta con una comunidad de código abierto madura y robusta, con una amplia gama de plugins optimizados para React (React-Leaflet) que facilitan una integración rápida y estable.
- **Cobertura funcional:** Leaflet cubrió a cabalidad los requerimientos técnicos de renderizado de pines, eventos de selección e interactividad del panel lateral exigidos en la prueba, logrando un rendimiento óptimo en el cliente.

### 7. Gestión de cambios tardíos del cliente

*A una semana de la entrega, el cliente solicita nuevas funcionalidades no contempladas inicialmente. ¿Cómo gestionaría esta situación?*

Gestionaría la situación evaluando el equilibrio crítico del triángulo de proyectos: costo, tiempo y alcance. Analizaría inmediatamente el impacto de la nueva petición para presentar opciones claras a los stakeholders: si la fecha de entrega es inamovible, se debe negociar el alcance desplazando funcionalidades de menor prioridad, o acordar un incremento en los costos y recursos, protegiendo así la estabilidad del equipo y asegurando la calidad del entregable final mediante un control de cambios formal.

## Visión de Producto

### 8. Mejoras hacia un producto robusto

*¿Qué mejoras propondría para convertir esta maqueta en un producto robusto y de alto impacto en un entorno real?*

- Modificar el despliegue actual en Docker, ya que este solo fue pensado para desarrollo.
- Adquirir activos como infraestructura y dominios.
- Implementar manejo de sesiones y autenticación, ya que actualmente solo cuenta con un cifrado usando SHA-256.
- Evaluaría features como la posibilidad de crear incidencias, agregar imágenes reales e integración con servicios de terceros según el dominio del negocio.
- Implementaría features como manejo de usuarios y dashboards que permitan el análisis, incorporando KPIs de relevancia para el negocio.
- Buscaría feedback y soluciones similares que permitan aumentar el valor de lo ya implementado.
