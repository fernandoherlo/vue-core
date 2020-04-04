function initPlugin(vm, componentObject, store, acl, routes, menu, initialGetters) {
  
  // Vuex
  vm.$store.registerModule(componentObject.coreExtendScopePl + 'Vuex', store)
  initialGetters.push('getAll' + componentObject.coreExtendVuexPl)

  // Menu
  menu.push({
    name: componentObject.displayName,
    scope: componentObject.coreExtendScopePl,
    type: 'sidebar'
  })

  // Acl
  vm.$acl.addComponent(componentObject.coreExtendScopePl, acl)

  // ADD routes
  vm.$router.addRoutes(routes)
}

let alreadyExecuted = []
function plugin(Vue, options) {
  if (options) {
    console.log(options)
    Vue.mixin({
      beforeCreate() {
        if (!alreadyExecuted[options.componentObject.coreExtendVuex] && this.$router){
          initPlugin(this, options.componentObject, options.store, options.acl, options.routes,  options.menu, options.initialGetters)
          alreadyExecuted[options.componentObject.coreExtendVuex] = true
        }
      }
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin