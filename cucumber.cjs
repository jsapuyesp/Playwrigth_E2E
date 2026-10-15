module.exports = {
  default: [
    "--require-module 'ts-node/register'",
    '--format "@serenity-js/cucumber"',
    '--format-options \'{"specDirectory":"features"}\'',
    "--require './src/step-definitions/**/*.ts'",
    "--require './src/support/hooks.ts'",
    'features/**/*.feature',
  ].join(' '),
};
