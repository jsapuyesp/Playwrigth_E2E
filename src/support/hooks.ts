import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import * as playwright from 'playwright';
import { Duration, engage } from '@serenity-js/core';

import { Actors } from '../screenplay/actors/Actors';
import { configureSerenity } from './serenity.config';
import { environment } from './environment';

let browser: playwright.Browser | undefined;

configureSerenity();

// Tiempo máximo para que Cucumber complete un step.
setDefaultTimeout(Duration.ofSeconds(30).inMilliseconds());

BeforeAll(async () => {
  // El hook crea el navegador y lo entrega al Cast de actores.
  browser = await playwright.chromium.launch({ headless: environment.headless });
  engage(new Actors(browser));
});

AfterAll(async () => {
  // El mismo ciclo de vida que crea el navegador lo libera al terminar.
  await browser?.close();
  browser = undefined;
});
