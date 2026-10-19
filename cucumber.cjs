module.exports = {
  default: [
    "--require-module 'ts-node/register'",
    '--format "allure-cucumberjs/reporter:reports/cucumber-formatters/allure-cucumberjs.log"',
    '--format "@serenity-js/cucumber:reports/cucumber-formatters/serenity-js.log"',
    '--format-options \'{"specDirectory":"features"}\'',
    "--require './src/support/hooks.ts'",
    "--require './src/step-definitions/**/*.ts'",
    'features/**/*.feature',
  ].join(' '),
};
