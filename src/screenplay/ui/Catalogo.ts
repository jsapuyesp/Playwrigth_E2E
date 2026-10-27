import { By, PageElement } from '@serenity-js/web';

// Elementos observables de la página que aparece después de iniciar sesión.
export const Catalogo = {
  titulo: PageElement.located(By.css('[data-test="title"]')).describedAs('título del catálogo'),
  agregarMochila: PageElement.located(By.css('[data-test="add-to-cart-sauce-labs-backpack"]'))
    .describedAs('botón para agregar la mochila Sauce Labs al carrito'),
  carrito: PageElement.located(By.css('[data-test="shopping-cart-link"]'))
    .describedAs('enlace al carrito de compras'),
};
