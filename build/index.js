/**
 * @name VueJS VueCore (vue-core)
 * @description Library for Vue.js 2.0
 */
 // Services
import auth from '@/services/auth'
import http from '@/services/http'
import api from '@/services/api'
import { EventBus } from '@/services/event-bus.js';

// Vuex
import VuexLoad from '@/vuex/modules/load'
import VuexGetters from '@/vuex/getters'
import VuexActions from '@/vuex/actions'
import VuexMutations from '@/vuex/mutations'
// Mixins
import Events from '@/mixins/events'
// Views
import Callback from '@/views/Callback'

export {
  auth,
  http,
  api,
  EventBus,
  VuexLoad,
  VuexGetters,
  VuexActions,
  VuexMutations,
  Events,
  Callback
}
