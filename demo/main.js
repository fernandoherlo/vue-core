/*
|--------------------------------------------------------------------------
| Vue
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| Core
|--------------------------------------------------------------------------
|
*/
import auth from '@/services/auth'
import http from '@/services/http'
import api from '@/services/api'
import acl from '@/services/acl'
import helper from '@/services/helper'
import { EventBus } from '@/services/event-bus.js';

/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
|
*/
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import VueAwesome from 'vue-awesome'

/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
|
*/
import App from './App.vue'
import store from './store'
import router from './router'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/
import Comments from './components/Comments'
import Posts from './components/Posts'
import Inlines from './components/Inlines'
import Relations from './components/Relations'
import Users from './components/Users'
// --
Vue.use(Comments)
Vue.use(Posts)
Vue.use(Inlines)
Vue.use(Relations)
Vue.use(Users)

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
Vue.config.productionTip = false

/*
|--------------------------------------------------------------------------
| Css & Font & Icons
|--------------------------------------------------------------------------
|
*/
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.component('icon', VueAwesome)

/*
|--------------------------------------------------------------------------
| Services CORE
|--------------------------------------------------------------------------
|
*/
const $EventBus = EventBus
Vue.prototype.$EventBus = $EventBus

Vue.use(auth, {config: process.env})
Vue.use(http)
Vue.use(api)
Vue.use(acl)
Vue.use(helper)

/*
|--------------------------------------------------------------------------
| Vue APP
|--------------------------------------------------------------------------
|
*/
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
