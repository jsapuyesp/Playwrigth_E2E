import { By, PageElement } from '@serenity-js/web';

export const Carrito = {
  checkout: PageElement.located(By.css('[data-test="checkout"]')).describedAs('botón para iniciar la compra'),
};
