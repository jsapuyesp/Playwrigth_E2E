import { Actor, Cast } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import type { Browser } from 'playwright';

import { environment } from '../../support/environment';

// Cast responsable de preparar cada actor con sus capacidades.
export class Actors implements Cast {
  constructor(private readonly browser: Browser) {}

  prepare(actor: Actor): Actor {
    // Conecta Screenplay con Playwright y aplica la configuración común.
    return actor.whoCan(BrowseTheWebWithPlaywright.using(
      this.browser,
      { baseURL: environment.baseUrl },
      {
        defaultNavigationTimeout: environment.navigationTimeout,
        defaultTimeout: environment.elementTimeout,
      },
    ));
  }
}
