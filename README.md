# SauceDemo Serenity/JS Pilot

Piloto de pruebas end-to-end en TypeScript que valida el inicio de sesión de
[SauceDemo](https://www.saucedemo.com). Coexiste con la suite Java existente y sirve
como referencia para adoptar el patrón **Screenplay** en el resto del equipo.

El proyecto usa **Cucumber.js** como runner, **Gherkin** (en español) para las
especificaciones, **Playwright** como motor de navegador y el modelo **Screenplay** que
aporta **Serenity/JS** (actores, capacidades, tareas, preguntas y aserciones).

## Stack

| Herramienta | Rol |
| --- | --- |
| [Cucumber.js](https://github.com/cucumber/cucumber-js) | Runner de escenarios Gherkin |
| [Serenity/JS](https://serenity-js.org) | Patrón Screenplay, orquestación y reporting |
| [Playwright](https://playwright.dev) | Automatización de Chromium |
| TypeScript | Lenguaje del código de soporte |
| ts-node | Ejecución directa de TypeScript |

## Requisitos

- Node.js `^22.22.2 || ^24.15.0` (ver `engines` en `package.json`)
- npm

## Instalación

```bash
npm install
npx playwright install chromium
```

`npx playwright install chromium` descarga el navegador que Playwright necesita. Solo
es necesario la primera vez (o cuando se actualice Playwright).

## Ejecución

| Comando | Descripción |
| --- | --- |
| `npm test` | Ejecuta todos los escenarios en Chromium sin interfaz gráfica |
| `npm run test:headed` | Ejecuta con el navegador visible (`HEADLESS=false`) |
| `npm run lint` | Analiza el código con ESLint (ver limitaciones conocidas) |

Para ejecutar un escenario concreto por etiqueta:

```bash
npx cucumber-js --config cucumber.cjs --tags @smoke
```

El runner se configura en `cucumber.cjs`, que carga:

- `ts-node/register` para ejecutar TypeScript sin compilar.
- El formateador `@serenity-js/cucumber`.
- Los pasos (`src/step-definitions/**/*.ts`) y los hooks (`src/support/hooks.ts`).
- Las especificaciones (`features/**/*.feature`).

## Reportes y evidencias

- **Consola**: `@serenity-js/console-reporter` imprime en vivo las actividades de cada actor.
- **HTML**: `@serenity-js/html-reporter` genera el informe en `reports/serenity-js/index.html`.
  También produce `summary.json` y el histórico de ejecuciones por corrida.
- **Allure**: el formateador `allure-cucumberjs/reporter` guarda los resultados en
  `reports/allure-results/`. Después de ejecutar las pruebas, genera y abre el informe con:

  ```bash
  npm run allure:generate
  npm run allure:open
  ```

  El informe se genera en `reports/allure-report/`. Todos los resultados y reportes quedan
  dentro de `reports/`, que está ignorado por Git.
- **Capturas**: el `Photographer` toma una captura únicamente cuando falla una interacción
  (`TakePhotosOfFailures`).
- La carpeta `reports/` está ignorada por Git.

Abre el informe Serenity/JS localmente en `reports/serenity-js/index.html`; el informe
Allure se abre con `npm run allure:open`. Los resultados de Allure quedan en
`reports/allure-results/`, y los registros de los formateadores de Cucumber en
`reports/cucumber-formatters/`. La vista de *Capabilities* de Serenity/JS se
construye a partir de `features/` (`specDirectory`).

## Arquitectura

```
.
├── cucumber.cjs                     # Configuración del runner de Cucumber
├── features/                        # Especificaciones de negocio (Gherkin)
│   ├── login.feature
│   ├── swaglabs_login.feature
│   └── buy_item.feature
├── src/
│   ├── step-definitions/            # Pasos delgados que delegan en Screenplay
│   │   ├── compras.steps.ts
│   │   └── swaglabs.steps.ts
│   ├── screenplay/
│   │   ├── actors/                  # Cast que asigna capacidades a los actores
│   │   │   └── Actors.ts
│   │   ├── tasks/                   # Acciones de negocio
│   │   │   ├── autenticacion/
│   │   │   │   └── IniciarSesion.ts
│   │   │   └── compras/
│   │   │       └── ComprarMochila.ts
│   │   ├── questions/               # Información observable
│   │   │   ├── autenticacion/
│   │   │   │   └── MensajeErrorInicioSesion.ts
│   │   │   └── compras/
│   │   │       ├── TituloDelCatalogo.ts
│   │   │       └── MensajeCompraFinalizada.ts
│   │   └── ui/                      # Localizadores de elementos
│   │       ├── Catalogo.ts
│   │       ├── Carrito.ts
│   │       ├── Checkout.ts
│   │       └── Login.ts
│   └── support/                     # Infraestructura de ejecución
│       ├── environment.ts           # Variables de entorno y valores por defecto
│       ├── hooks.ts                 # Ciclo de vida del navegador y de Serenity
│       └── serenity.config.ts       # Cast, crew y reporting
├── package.json
└── tsconfig.json
```

### Modelo Screenplay

- **Actores y capacidades** (`src/screenplay/actors/Actors.ts`): el `Cast` entrega a cada
  actor la capacidad `BrowseTheWebWithPlaywright`, con `baseURL` y tiempos de espera
  tomados del ambiente. Serenity/JS crea un contexto aislado por actor y escenario.
- **Tareas** (`src/screenplay/tasks/`): acciones con significado de negocio, por ejemplo
  `IniciarSesion.con(usuario, contraseña)` y `ComprarMochila.conDatosDeEntrega(datos)`.
  Se componen con `Task.where` a partir de interacciones oficiales (`Enter`, `Click`).
- **Preguntas** (`src/screenplay/questions/`): exponen información observable de la UI,
  por ejemplo `TituloDelCatalogo()`, `MensajeErrorInicioSesion()` y
  `MensajeCompraFinalizada()`, apoyándose en `Text.of`.
- **UI** (`src/screenplay/ui/`): describen elementos con `PageElement` y localizadores,
  sin lógica de negocio ni flujos.
- **Pasos** (`src/step-definitions/`): traducen Gherkin a Screenplay. No contienen
  selectores ni secuencias de clics; delegan en actores, tareas y aserciones
  (`@serenity-js/assertions`).
- **Hooks** (`src/support/hooks.ts`): lanzan Chromium en `BeforeAll`, configuran Serenity
  vía `configureSerenity(...)` y lo cierran en `AfterAll`. Quien crea el recurso es quien
  lo libera.

## Configuración

Todo se ajusta por variables de entorno, sin modificar el modelo:

| Variable | Por defecto | Descripción |
| --- | --- | --- |
| `SAUCEDEMO_BASE_URL` | `https://www.saucedemo.com` | URL base de la aplicación |
| `SAUCEDEMO_USERNAME` | `standard_user` | Usuario con el que se inicia sesión |
| `SAUCEDEMO_PASSWORD` | `secret_sauce` | Contraseña del usuario |
| `HEADLESS` | `true` | Con `false` se abre el navegador |
| `NAVIGATION_TIMEOUT_MS` | `15000` | Tiempo máximo de navegación (ms) |
| `ELEMENT_TIMEOUT_MS` | `5000` | Tiempo máximo para operaciones de Playwright (ms) |

Ejemplos:

```bash
# bash
SAUCEDEMO_USERNAME=problem_user npm test
```

```powershell
# PowerShell
$env:SAUCEDEMO_USERNAME="problem_user"; npm test
```

## Cómo agregar un escenario

1. Escribe el escenario en un `.feature` dentro de `features/` (recuerda `# language: es`).
2. Reutiliza o crea **tareas** en `src/screenplay/tasks/` y **preguntas** en
   `src/screenplay/questions/`.
3. Añade localizadores nuevos en `src/screenplay/ui/` si hace falta.
4. Implementa los pasos en `src/step-definitions/` delegando en los actores.
5. Ejecuta `npm test` y revisa el informe en `reports/serenity-js/index.html`.

## Limitaciones conocidas

- `npm run lint` falla porque el proyecto usa ESLint 9 y aún no existe un
  `eslint.config.js` (flat config).
- `tsconfig.json` define `"ignoreDeprecations": "6.0"`, que TypeScript 5.9.3 rechaza; para
  `npx tsc --noEmit` hay que usar `"5.0"`. No afecta a `npm test`.
- Las credenciales configuradas aparecen en el reporte y la consola. Si se usan
  credenciales reales, conviene envolver el valor con `Masked.valueOf(...)` de
  `@serenity-js/core` al introducirlo.
