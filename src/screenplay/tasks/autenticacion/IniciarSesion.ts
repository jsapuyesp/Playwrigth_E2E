import { Task } from '@serenity-js/core';
import { Click, Enter } from '@serenity-js/web';

import { Login } from '../../ui/Login';

// Task de negocio reutilizable: encapsula cómo un actor inicia sesión.
export const IniciarSesion = {
  con: (usuario: string, contraseña: string) =>
    // Task.where registra un nombre legible y compone interacciones oficiales.
    Task.where(`#actor inicia sesión como ${usuario}`,
      Enter.theValue(usuario).into(Login.username),
      Enter.theValue(contraseña).into(Login.password),
      Click.on(Login.submit),
    ),
};
