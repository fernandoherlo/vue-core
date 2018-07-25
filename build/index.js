/**
 * @name VueJS VueCore (vue-core)
 * @description Library for Vue.js 2.0
 */
import AuthService from '@/services/auth'
import HttpService from '@/services/http'
import Callback from '../src/components/Callback'

var $core = {
	AuthService,
	HttpService,
	Callback
}

export default $core

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.prototype.$core = $core
}