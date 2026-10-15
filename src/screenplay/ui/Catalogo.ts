import { By, PageElement } from '@serenity-js/web';

// Elementos observables de la página que aparece después de iniciar sesión.
export const Catalogo = {
  titulo: PageElement.located(By.css('[data-test="title"]')).describedAs('título del catálogo'),
};
