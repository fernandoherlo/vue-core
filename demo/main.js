import Vue from 'vue'
import store from './store'
import router from './router'
import AuthService from '@/services/auth'
import HttpService from '@/services/http'
import ApiService from '@/services/api'
import { EventBus } from '@/services/event-bus.js';

// DEMO
// ---
import App from './App.vue'
// ---

// Config
Vue.config.productionTip = false

// Services
const $auth = new AuthService()
Vue.prototype.$auth = $auth
const $http = new HttpService($auth)
Vue.prototype.$http = $http
const $api = new ApiService($http)
Vue.prototype.$api = $api
const $EventBus = EventBus
Vue.prototype.$EventBus = $EventBus

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
