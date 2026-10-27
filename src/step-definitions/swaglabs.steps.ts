import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

import { MensajeErrorInicioSesion } from '../screenplay/questions/autenticacion/MensajeErrorInicioSesion';
import { MensajeCompraFinalizada } from '../screenplay/questions/compras/MensajeCompraFinalizada';
import { ComprarMochila } from '../screenplay/tasks/compras/ComprarMochila';
import { IniciarSesion } from '../screenplay/tasks/autenticacion/IniciarSesion';

Given('User is on the login page', async (urlTable: DataTable) => {
  const url = urlTable.raw()[1]?.[0] || '/';
  await actorCalled('Usuario').attemptsTo(Navigate.to(url));
});

When('User attempts to login with the following credentials', async (credentialsTable: DataTable) => {
  const [credentials] = credentialsTable.hashes();

  if (!credentials?.username || !credentials.password) {
    throw new Error('La tabla de credenciales debe incluir username y password.');
  }

  await actorInTheSpotlight().attemptsTo(
    IniciarSesion.con(credentials.username, credentials.password),
  );
});

Then('he should be presented with the error message', async (messageTable: DataTable) => {
  const expectedMessage = messageTable.hashes()[0]?.message;

  if (!expectedMessage) {
    throw new Error('La tabla de resultado debe incluir el mensaje esperado.');
  }

  await actorInTheSpotlight().attemptsTo(
    Ensure.that(MensajeErrorInicioSesion(), equals(expectedMessage)),
  );
});

When('User selected some item', async () => {
  await actorInTheSpotlight().attemptsTo(
    ComprarMochila.conDatosDeEntrega({
      nombre: 'Ana',
      apellido: 'Pruebas',
      codigoPostal: '12345',
    }),
  );
});

Then('he can see finalized his purchase', async (messageTable: DataTable) => {
  const expectedMessage = messageTable.raw()[0]?.[0];

  if (!expectedMessage) {
    throw new Error('La tabla debe incluir el mensaje de confirmación esperado.');
  }

  await actorInTheSpotlight().attemptsTo(
    Ensure.that(MensajeCompraFinalizada(), equals(expectedMessage)),
  );
});
