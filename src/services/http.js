/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Axios from 'axios'

/*
|--------------------------------------------------------------------------
| $http
|--------------------------------------------------------------------------
|
*/
export default class HttpService {
  constructor ($auth) {
    this.$auth = $auth
    this.axios = Axios.create({
      timeout: 720000, // 720 segundos
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('idToken') }
    })

    this.axios.interceptors.response.use(
      function (response) {
        return Promise.resolve(response)
      },
      function (error) {
        if (error.response.status === 401) {
          $auth.logout()
        }
        return Promise.reject(error)
      }
    )

    this.axios.interceptors.request.use(
      function (request) {
        // Check Auth
        if (!$auth.authenticated) {
          $auth.logout()
        }
        return request
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }
}
