# SauceDemo Serenity/JS pilot

Piloto TypeScript que coexiste con la suite Java existente. Usa Cucumber.js, Gherkin, Playwright y Screenplay de Serenity/JS.

## Arquitectura

- `features/`: especificaciones Gherkin en español.
- `src/step-definitions/`: pasos delgados que delegan en Screenplay.
- `src/screenplay/`: actores, UI, Tasks y Questions.
- `src/support/`: hooks, configuración de Serenity y ambiente.

## Run

```bash
npm install
npx playwright install chromium
npm test
```

Usa `npm run test:headed` para abrir Chromium. La URL y credenciales son configurables mediante `SAUCEDEMO_BASE_URL`, `SAUCEDEMO_USERNAME` y `SAUCEDEMO_PASSWORD`. El reporte HTML queda en `reports/serenity-js`.
