/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
*/
import ViewItem from './views/Edit'
import ViewNew from './views/New'

/*
|--------------------------------------------------------------------------
| Vuex
|--------------------------------------------------------------------------
|
*/
import Vuex from './config/store'
import { initialGetters } from '../../store/modules'

/*
|--------------------------------------------------------------------------
| ACL
|--------------------------------------------------------------------------
|
*/
import Acl from './config/acl'

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
// eslint-disable-next-line
import config from './config/_constants'

/*
|--------------------------------------------------------------------------
| Plugin
|--------------------------------------------------------------------------
|
*/
let alreadyExecuted = false
function plugin(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!alreadyExecuted && this.$router){
        initPlugin(this)
        alreadyExecuted = true
      }
    }
  })
}

function initPlugin(vm) {
  
  // Vuex
  vm.$store.registerModule(config.SCOPE_PL + 'Vuex', Vuex)
  initialGetters.push('getAll' + config.VUEX_MUTATION_PL)

  // Acl
  vm.$acl.addComponent(config.SCOPE_PL, Acl)

  // ADD routes
  vm.$router.addRoutes(
  [
    {
      path: '/' + config.SCOPE_PL + '/:id/:id_parent',
      name: config.SCOPE,
      component: ViewItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/' + config.SCOPE_PL + '/new/:id_parent',
      name: config.SCOPE + '-new',
      component: ViewNew,
      meta: {
        requiresAuth: true
      }
    }
  ])
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin
