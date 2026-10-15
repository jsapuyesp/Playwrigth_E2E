import { Given, Then, When } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { Ensure, equals } from '@serenity-js/assertions';
import { Navigate } from '@serenity-js/web';

import { TituloDelCatalogo } from '../screenplay/questions/compras/TituloDelCatalogo';
import { IniciarSesion } from '../screenplay/tasks/autenticacion/IniciarSesion';
import { environment } from '../support/environment';

// Los steps traducen Gherkin a Screenplay; no conocen selectores ni Playwright.
Given('{word} abre SauceDemo', async (nombre: string) =>
  actorCalled(nombre).attemptsTo(Navigate.to('/'))
);

When('inicia sesión con sus credenciales configuradas', async () =>
  // La acción de negocio vive en una Task reutilizable.
  actorInTheSpotlight().attemptsTo(IniciarSesion.con(environment.username, environment.password))
);

Then('debería ver la página de productos', async () =>
  // Ensure expresa la expectativa usando la Question observable.
  actorInTheSpotlight().attemptsTo(Ensure.that(TituloDelCatalogo(), equals('Products')))
);
