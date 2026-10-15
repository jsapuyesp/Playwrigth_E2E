// Convierte una variable numérica y usa un valor seguro si no está definida.
const numberFromEnvironment = (name: string, fallback: number): number => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
};

// Permite cambiar ambiente, credenciales y tiempos sin modificar el modelo.
export const environment = {
  baseUrl: process.env.SAUCEDEMO_BASE_URL ?? 'https://www.saucedemo.com',
  username: process.env.SAUCEDEMO_USERNAME ?? 'standard_user',
  password: process.env.SAUCEDEMO_PASSWORD ?? 'secret_sauce',
  headless: process.env.HEADLESS !== 'false',
  navigationTimeout: numberFromEnvironment('NAVIGATION_TIMEOUT_MS', 15_000),
  elementTimeout: numberFromEnvironment('ELEMENT_TIMEOUT_MS', 5_000),
};
