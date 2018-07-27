/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import auth0 from 'auth0-js'

/*
|--------------------------------------------------------------------------
| auth0
|--------------------------------------------------------------------------
|
*/
export default {
  install: function(Vue, options) {
    let webAuth = new auth0.WebAuth({
      domain: options.config.VUE_APP_AUTH0_DOMAIN,
      clientID: options.config.VUE_APP_AUTH0_CLIENT_ID,
      redirectUri: options.config.VUE_APP_AUTH0_CALLBACK_URL,
      audience: `https://${options.config.VUE_APP_AUTH0_DOMAIN}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid'
    })

    let auth = new Vue({
      computed: {
        authenticated: function () {
          return this.isAuthenticated()
        }
      },
      methods: {
        login () {
          webAuth.authorize()
        },

        handleAuthentication () {
          webAuth.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.setSession(authResult)
              // Reload window
              window.location.reload(true)
            } else if (err) {
              alert(`Error: ${err.error}. Check the console for further details.`)
              webAuth.authorize()
            }
          })
        },
        
        setSession (authResult) {
          // Set the time that the access token will expire at
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          localStorage.setItem('access_token', authResult.accessToken)
          localStorage.setItem('id_token', authResult.idToken)
          localStorage.setItem('expires_at', expiresAt)
        },

        logout () {
          // Clear access token and ID token from local storage
          localStorage.removeItem('access_token')
          localStorage.removeItem('id_token')
          localStorage.removeItem('expires_at')
          webAuth.authorize()
        },

        isAuthenticated () {
          // Check whether the current time is past the
          // access token's expiry time
          let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
          return new Date().getTime() < expiresAt
        }
      }
    })
    Vue.prototype.$auth = auth
  }
}
