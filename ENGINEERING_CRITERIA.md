# Evaluación de Criterio Técnico

## Escalabilidad y Arquitectura

1. Si esta maqueta evolucionara a una aplicación productiva utilizada por miles de usuarios
concurrentes, ¿qué cambios arquitectónicos propondría y por qué?

Este proyecto fue diseñado desde el primer momento siguiendo los principios de Domain-Driven Design (DDD) y Clean Architecture estructurado como un Monolito Modular, cuenta con fronteras definidas y desacopladas entre los diferentes contextos de negocio (como Auth y Cases). Esta estructura evita tener que reescribir el software desde cero y permite una ruta de evolución fluida hacia sistemas distribuidos.

Para soportar miles de usuarios concurrentes de forma eficiente, propongo los siguientes cambios arquitectónicos e infraestructurales:

**Transición de Monolito Modular a Microservicios:**

Extraer los contextos delimitados independientes (por ejemplo, el módulo geoespacial de Cases) hacia microservicios aislados que se comuniquen mediante patrones asíncronos orientados a eventos.
al aislar los dominios de alta carga (como consultas de mapas y reportes de incidencias en tiempo real) de los módulos de menor tráfico, evitando la contención de recursos.

**Infraestructura y Orquestación (Kubernetes):**

Migrar los contenedores (API de NestJS y frontend en Nginx) desde un VPS tradicional hacia clústeres administrados de Kubernetes (K8s) (por ejemplo, AWS EKS o Hetzner). Esto Permite el auto-escalado horizontal de pods (HPA) basado en métricas de CPU, memoria y throughput de peticiones entrantes durante las horas pico.

**Procesamiento Asíncrono y Concurrencia (Event-Driven):**

Programación y Concurrencia: Introducir un message broker (como RabbitMQ, Kafka o AWS SQS/SNS) combinado con funciones serverless (AWS Lambda) para tareas pesadas en segundo plano (como cargas masivas de casos o cálculos geoespaciales complejos). De esta manera evita bloquear el pool de hilos principal de peticiones HTTP de la API, protegiendo el pool de conexiones a la base de datos.

**Capas de Caché y Optimización de Throughput:**

Implementar una capa de caché distribuida utilizando Redis entre la API y PostgreSQL para almacenar consultas geográficas frecuentes, límites de mapas (bounding boxes) y sesiones de usuario.
Reduce drásticamente la latencia de lectura, alivia la carga de CPU en la base de datos y maximiza el throughput general del sistema.

**Pipelines de CI/CD Automatizados:**

Establecer workflows robustos de integración y despliegue continuo (usando GitHub Actions o otras alternativas) con pruebas automatizadas (TDD), escaneo de seguridad en contenedores, actualizaciones sin interrupciones en Kubernetes en implementacion de infraestructura como codigo (IaC) para maximizar la entrega continua. Para esto se pueden usar herramientas como ansible y terraform.


2. ¿Cómo estructuraría el frontend y el backend para garantizar mantenibilidad y
crecimiento a largo plazo?

**En el Frontend**

(Frontend Sliced + Atomic Web Design + Composition):

El código del cliente se organiza en carpetas centradas en dominios de negocio o funcionalidades (features/auth, features/dashboard), evitando el acoplamiento masivo en carpetas genéricas de componentes, siguientedo el patron Feature-Driven.

Continuar aplicando Atomic Web Design y Component Composition ya que de esta manera se estructuran los componentes desde los elementos más atómicos (botones, inputs, estados de carga y error) hasta organismos complejos (como la vista dividida del mapa y el panel lateral), utilizando composición de componentes para mantener interfaces limpias, reutilizables y altamente testeables.

3. ¿Qué estrategias implementaría para optimizar el rendimiento del mapa si el sistema
tuviera miles de casos georreferenciados?

- Delitimar la consulta de los puntos a la region que el usuario escoja, busqueda radial, busqueda por division de areas en ciudades como Medellin tener la posibilidad de cargar informacion por comuinas.
- En lugar de cargar todos los casos de la base de datos, el frontend envía dinámicamente las coordenadas geográficas de los límites actuales del mapa.
- Se implemento la librería Leaflet.markercluster que agrupa los pines cercanos en un solo indicadorcuando el nivel de zoom es alejado, desagrupándolos conforme el usuario se acerca.
- Utilizar extensiones avanzadas como PostGIS en PostgreSQL.

## Gestión Técnica y Organización del Trabajo

4. Si liderara un equipo de 3 a 5 desarrolladores para construir esta aplicación en un
entorno real, ¿cómo organizaría el trabajo (metodología, división de tareas, revisiones de
código, entregables, etc.)?

Buscaria trabajar bajo un marco agil híbrido (Scrum con prácticas de eXtreme Programming como Pair Programming y tableros Kanban para flujo continuo). esto permitiria el trabajo individual y la
responsabilidad compartidad aprovechando los ciclos de retroalimentacion en Scrum, la colaboracion por pares ya que esto puede permitir abordar una solucion desde multiples puntos de vista.

Para la gestion y division de tareas propondria el uso de herramientas de gestión (Jira, Trello u OpenProject). La división de tareas se basaria en evaluar las fortalezas individuales del equipo, fomentando el trabajo colaborativo para el crecimiento técnico mutuo.

Para las revisiones de codigo haria control estricto mediante Pull Requests respaldados por validaciones automáticas (Linters, analizadores estáticos de código, herramientas de IA) y revisiones cruzadas por pares.

Trabajando bajo Scrum al finalizar cada sprint se esperarian incrementos de producto funcionales , cumpliendo estrictamente con los objetivos de negocio y calidad definidos previamente.

5. ¿Qué prácticas implementaría para garantizar calidad del código y reducir deuda
técnica?

Para garantizar la calidad del código y mitigar la deuda técnica se requiere un enfoque que comienza con un riguroso levantamiento de requerimientos claros que traduzca con precisión las necesidades del negocio, previniendo ambigüedades que generen re-procesos. En otro momento implementar Test-Driven Development (TDD) para asegurar que cada componente nazca testeado y modular, abarcando pruebas unitarias, de integración y end-to-end. Este código robusto es validado de manera automatizada mediante pipelines de CI/CD equipados con linters y analizadores estáticos que detectan anomalías tempranamente, reduciendo el costo de corrección. Complementariamente, una cultura de code reviews rigurosas y entrenamiento continuo transforma la revisión técnica en un espacio de mentoría y estandarización. En el centro de todo este engranaje se encuentra el accountability y una cultura de mejora continua, donde cada desarrollador se asume como parte de un producto, asegurando que la mantenibilidad y la excelencia técnica sean valores inquebrantables del equipo

## Toma de Decisiones

6. Si existieran dos propuestas tecnológicas distintas para implementar el mapa (por
ejemplo, Google Maps vs. Leaflet), ¿qué criterios utilizaría para tomar la decisión final?

Para el desarrollo de este proyecto, la elección entre Google Maps y Leaflet se resolvió aplicando los siguientes criterios clave:

**Alineación con el Subdominio y Requerimientos:** Se analizó que el alcance de la prueba requería una visualización limpia y directa de incidencias geoespaciales sin la sobreingeniería o los costos asociados a SDKs comerciales masivos, haciendo de Leaflet una opción ligera y altamente personalizable.

**Costos Económicos:** Se priorizó una solución libre de costos  o tarifas de consumo por visualización, lo cual garantiza escalabilidad financiera.

**Soporte y Comunidad:** Leaflet cuenta con una comunidad de código abierto madura y robusta, con una amplia gama de plugins optimizados para React (React-Leaflet) que facilitan la integración rápida y estable.

**Cobertura Funcional:** Leaflet cubrió a cabalidad los requerimientos técnicos de renderizado de pines, eventos de selección e interactividad del panel lateral exigidos en la prueba, logrando un rendimiento óptimo en el cliente

7. A una semana de la entrega, el cliente solicita nuevas funcionalidades no contempladas
inicialmente. ¿Cómo gestionaría esta situación?

Gestionaría la situación evaluando el equilibrio crítico del triángulo de proyectos: Costo, Tiempo y Alcance. Analizaría inmediatamente el impacto de la nueva petición para presentar opciones claras a los stakeholders: si la fecha de entrega es inamovible, se debe negociar el alcance desplazando funcionalidades de menor prioridad o acordar un incremento en los costos y recursos, protegiendo así la estabilidad del equipo y asegurando la calidad del entregable final mediante un control de cambios formal.

## Visión de Producto

8. ¿Qué mejoras propondría para convertir esta maqueta en un producto robusto y de alto
impacto en un entorno real?

= Modificar el despliegue actual en Docker ya que este solo fue pensado para desarrollo.
- Aquirir activos como infraestructura, Dominios.
- Implementar manejo de sesiones y autentificacion, ya que actualmente solo tiene un cifrado usando SHA-256.
- Evaluaria features como: La posibilidad de crear incidencia, agregar imagenes reales, integracion con servicios de terceros segun el dominio del negocio.
- Implementaria features como manejor de usuarios, dashboard que permitan el analizis implementando KPS's de relevancia para el negocio.
- Buscaria feedback y soluciones similares que permitan aumentar el valor de lo ya implementado.
