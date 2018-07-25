import Vue from 'vue'
import store from './store'
import router from './router'
import auth from '@/services/auth'
import http from '@/services/http'
import api from '@/services/api'
import { EventBus } from '@/services/event-bus.js';

// DEMO
// ---
import App from './App.vue'
// ---

// Config
Vue.config.productionTip = false

// Services
const $EventBus = EventBus
Vue.prototype.$EventBus = $EventBus

Vue.use(auth)
Vue.use(http)
Vue.use(api)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
