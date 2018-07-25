/**
 * @name VueJS VueCore (vue-core)
 * @description Library for Vue.js 2.0
 */
 // Services
import AuthService from '@/services/auth'
import HttpService from '@/services/http'
import ApiService from '@/services/api'
import { EventBus } from '@/services/event-bus.js';
// Vuex
import VuexLoad from '@/vuex/modules/load'
import VuexGetters from '@/vuex/getters'
import VuexActions from '@/vuex/actions'
import VuexMutations from '@/vuex/mutations'
// Views
import Callback from '@/views/Callback'

var $core = {
	AuthService,
	HttpService,
	ApiService,
	EventBus,
	VuexLoad,
	VuexGetters,
	VuexActions,
	VuexMutations,
	Callback
}

export default $core

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.prototype.$core = $core
}