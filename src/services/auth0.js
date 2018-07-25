import Vue from 'vue'
import auth0 from 'auth0-js'

export default class AuthService {

  authenticated = this.isAuthenticated()
  EventsVue = new Vue({})

  constructor (APP_CONFIG) {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  
    this.auth0 = new auth0.WebAuth({
      domain: APP_CONFIG.AUTH0_DOMAIN,
      clientID: APP_CONFIG.AUTH0_CLIENT_ID,
      redirectUri: APP_CONFIG.AUTH0_CALLBACK_URL,
      audience: `https://${APP_CONFIG.AUTH0_DOMAIN}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid'
    })
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        this.EventsVue.$emit('goRouter', 'dashboardcore')
      } else if (err) {
        this.EventsVue.$emit('goRouter', 'homecore')
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.EventsVue.$emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.EventsVue.$emit('authChange', false)
    // navigate to the home route
    this.EventsVue.$emit('goRouter', 'homecore')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
