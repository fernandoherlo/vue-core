/*
|--------------------------------------------------------------------------
| Init
|--------------------------------------------------------------------------
|
*/
function initPlugin(vm, configPlugin, store, acl, initialGetters) {
  
  // Vuex
  vm.$store.registerModule(configPlugin.options.coreExtendScopePl + 'Vuex', store)
  initialGetters.push('getAll' + configPlugin.options.coreExtendVuexPl)

  // Acl
  vm.$acl.addComponent(configPlugin.options.coreExtendScopePl, acl)

  // ADD routes
  vm.$router.addRoutes(configPlugin.routes)
}

export default initPlugin