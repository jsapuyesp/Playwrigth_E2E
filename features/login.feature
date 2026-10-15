# language: es
Característica: Inicio de sesión en SauceDemo

  @smoke
  Escenario: Un usuario estándar inicia sesión correctamente
    Dado Ana abre SauceDemo
    Cuando inicia sesión con sus credenciales configuradas
    Entonces debería ver la página de productos
