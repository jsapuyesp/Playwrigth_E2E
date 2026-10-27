import { Task } from '@serenity-js/core';
import { Click, Enter } from '@serenity-js/web';

import { Carrito } from '../../ui/Carrito';
import { Catalogo } from '../../ui/Catalogo';
import { Checkout } from '../../ui/Checkout';

export interface DatosDeEntrega {
  nombre: string;
  apellido: string;
  codigoPostal: string;
}

export const ComprarMochila = {
  conDatosDeEntrega: (datos: DatosDeEntrega) =>
    Task.where(
      '#actor compra la mochila Sauce Labs',
      Click.on(Catalogo.agregarMochila),
      Click.on(Catalogo.carrito),
      Click.on(Carrito.checkout),
      Enter.theValue(datos.nombre).into(Checkout.nombre),
      Enter.theValue(datos.apellido).into(Checkout.apellido),
      Enter.theValue(datos.codigoPostal).into(Checkout.codigoPostal),
      Click.on(Checkout.continuar),
      Click.on(Checkout.finalizar),
    ),
};
