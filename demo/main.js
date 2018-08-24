import Vue from 'vue'
import store from './store'
import router from './router'
import auth from '@/services/auth'
import http from '@/services/http'
import api from '@/services/api'
import acl from '@/services/acl'
import { EventBus } from '@/services/event-bus.js';

// DEMO
// ---
import App from './App.vue'
// ---

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/
import Comments from './components/Comments'
// --
Vue.use(Comments)

// Config
Vue.config.productionTip = false

// Services
const $EventBus = EventBus
Vue.prototype.$EventBus = $EventBus

Vue.use(auth, {config: process.env})
Vue.use(http)
Vue.use(api)
Vue.use(acl)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
