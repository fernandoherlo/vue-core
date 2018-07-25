/**
 * Configuración de la APP
 *
 */
var config = {
  API_URL: process.env.VUE_APP_API_URL,
  AUTH0_CLIENT_ID: process.env.VUE_APP_AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.VUE_APP_AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.VUE_APP_AUTH0_CALLBACK_URL
}
module.exports = config
