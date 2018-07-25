import Vue from 'vue'
import store from './store'
import router from './router'
import AuthService from '@/services/auth'
import HttpService from '@/services/http'

// DEMO
// ---
import App from './App.vue'
// ---

// Config
Vue.config.productionTip = false

// Services
var $auth = new AuthService()
Vue.prototype.$auth = $auth
var $http = new HttpService($auth)
Vue.prototype.$http = $http

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
