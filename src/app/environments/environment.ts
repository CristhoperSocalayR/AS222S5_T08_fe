export const environment = {
  production: false,
  // Usamos directamente la variable de entorno sin valor por defecto
  BACK_URL: process.env["BACK_URL"], // Toma el valor de la variable de entorno sin fallback
};
