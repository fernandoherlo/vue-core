function initPlugin(vm, componentObject, store, acl, routes, menu, initialGetters) {
  
  // Vuex
  vm.$store.registerModule(componentObject.coreExtendScopePl + 'Vuex', store)
  initialGetters.push('getAll' + componentObject.coreExtendVuexPl)

  // Menu
  menu.push({
    name: componentObject.displayName,
    scope: componentObject.coreExtendScopePl,
    type: componentObject.typeMenu,
    foot: componentObject.footMenu,
  })

  // Acl
  vm.$acl.addComponent(componentObject.coreExtendScopePl, acl)

  // ADD routes
  vm.$router.addRoutes(routes)
}

export default initPlugin