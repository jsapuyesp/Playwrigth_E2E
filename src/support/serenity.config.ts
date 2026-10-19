import { configure, Duration } from '@serenity-js/core';
import path from 'node:path';

// Registra el Cast y los servicios de reporting de Serenity/JS.
export const configureSerenity = (): void => {
  configure({
    crew: [
      // Salida legible en consola.
      ['@serenity-js/console-reporter', { theme: 'auto' }],
      // Captura evidencias únicamente cuando falla una interacción.
      ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' }],
      // Genera el HTML a partir de las especificaciones Gherkin.
      [
        '@serenity-js/html-reporter',
        {
          outputDirectory: path.resolve(process.cwd(), 'reports', 'serenity-js'),
          specDirectory: path.resolve(process.cwd(), 'features'),
        },
      ],
    ],
    cueTimeout: Duration.ofSeconds(5),
  });
};
