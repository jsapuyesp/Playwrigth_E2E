import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import * as playwright from 'playwright';
import { Duration } from '@serenity-js/core';

import { configureSerenity } from './serenity.config';
import { environment } from './environment';

let browser: playwright.Browser | undefined;

// Tiempo máximo para que Cucumber complete un step.
setDefaultTimeout(Duration.ofSeconds(30).inMilliseconds());

BeforeAll(async () => {
  // El hook crea el navegador y la configuración lo entrega al Cast.
  browser = await playwright.chromium.launch({ headless: environment.headless });
  configureSerenity(browser);
});

AfterAll(async () => {
  // El mismo ciclo de vida que crea el navegador lo libera al terminar.
  await browser?.close();
  browser = undefined;
});
