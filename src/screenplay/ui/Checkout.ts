import { By, PageElement } from '@serenity-js/web';

export const Checkout = {
  nombre: PageElement.located(By.css('[data-test="firstName"]')).describedAs('campo de nombre'),
  apellido: PageElement.located(By.css('[data-test="lastName"]')).describedAs('campo de apellido'),
  codigoPostal: PageElement.located(By.css('[data-test="postalCode"]')).describedAs('campo de código postal'),
  continuar: PageElement.located(By.css('[data-test="continue"]')).describedAs('botón para continuar al resumen'),
  finalizar: PageElement.located(By.css('[data-test="finish"]')).describedAs('botón para finalizar la compra'),
  mensajeFinalizacion: PageElement.located(By.css('[data-test="complete-header"]'))
    .describedAs('mensaje de confirmación de la compra'),
};
