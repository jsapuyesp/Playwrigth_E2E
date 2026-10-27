import { By, PageElement } from '@serenity-js/web';

// Elementos de la pantalla de autenticación. Este módulo describe la UI,
// pero no contiene acciones ni reglas de negocio.
export const Login = {
  // Los localizadores por id son estables y expresan la intención del elemento.
  username: PageElement.located(By.id('user-name')).describedAs('campo de usuario'),
  password: PageElement.located(By.id('password')).describedAs('campo de contraseña'),
  submit: PageElement.located(By.id('login-button')).describedAs('botón de inicio de sesión'),
  errorMessage: PageElement.located(By.css('[data-test="error"]')).describedAs('mensaje de error de inicio de sesión'),
};
