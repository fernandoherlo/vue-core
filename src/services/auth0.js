/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import auth0 from 'auth0-js'
import jwt_decode from 'jwt-decode'

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
      scope: 'openid email'
    })

    let auth = new Vue({
      computed: {
        authenticated: function () {
          return this.isAuthenticated()
        }
      },
      methods: {
        login () {
          // Degub
          this.$log.debug('AUTH0')
          webAuth.authorize({
            prompt: 'login'
          })
        },

        handleAuthentication () {
          // Degub
          this.$log.debug('AUTH0')
          webAuth.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.setSession(authResult)
              // Reload window
              window.location.reload(true)
            } else if (err) {
              // alert(`Error: ${err.error}. Check the console for further details.`)
              this.$log.fatal(`handleAuthentication () Error: ${err.error}. Check the console for further details.`)
              webAuth.authorize({
                prompt: 'login'
              })
            }
          })
        },

        getUserInfo (param) {
          // Degub
          this.$log.debug('AUTH0')
          let userPromise = new Promise((resolve) => {
            // this.verifyAuthentication((data) => {
            //   resolve(data[param])
            // })

            var data = jwt_decode(localStorage.getItem('id_token'))
            resolve(data[param])

            // webAuth.client.userInfo(localStorage.getItem('access_token'), function(err, data) {
            //   resolve(data[param])
            // });

          })
          return userPromise
        },

        verifyAuthentication (callback) {
          // Degub
          this.$log.debug('AUTH0')
          // Options
          let options = {
            state: localStorage.getItem('state'),
            nonce: localStorage.getItem('nonce'),
            hash: 'access_token=' + localStorage.getItem('access_token') + '&expires_in=' + localStorage.getItem('expires_in') + '&token_type=Bearer&state=' + localStorage.getItem('state') + '&id_token=' + localStorage.getItem('id_token')
          };
          // Parse
          webAuth.parseHash(options, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              callback(authResult.idTokenPayload)
            } else if (err) {
              this.$log.fatal(`verifyAuthentication () Error: ${err.error}. Check the console for further details.`)
              webAuth.authorize({
                prompt: 'login'
              })
            }
          })
        },
        
        setSession (authResult) {
          // Degub
          this.$log.debug('AUTH0')
          // Set the time that the access token will expire at
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          localStorage.setItem('access_token', authResult.accessToken)
          localStorage.setItem('id_token', authResult.idToken)
          localStorage.setItem('state', authResult.state)
          localStorage.setItem('expires_in', authResult.expiresIn)
          localStorage.setItem('expires_at', expiresAt)
          localStorage.setItem('nonce', authResult.idTokenPayload.nonce)
        },

        logout () {
          // Degub
          this.$log.debug('AUTH0 -> logout()')
          // Clear access token and ID token from local storage
          localStorage.removeItem('access_token')
          localStorage.removeItem('id_token')
          localStorage.removeItem('state')
          localStorage.removeItem('expires_in')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('nonce')
          webAuth.authorize({
            prompt: 'login'
          })
        },

        isAuthenticated () {
          // Degub
          this.$log.debug('AUTH0')
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
