/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| $acl
|--------------------------------------------------------------------------
|
*/
let acl = new Vue({
  data () {
    return {
      components: {}
    }
  },
  methods: {
    addComponent (name, component) {
      // Degub
      this.$log.debug('ACL', name, component)
      // Add
      this.components[name] = component
    },
    can (component, permission) {
      // Degub
      this.$log.debug('ACL', component, permission)
      // Can
      let canPromise = new Promise((resolve, reject) => {
        this.$auth.getUserInfo('https://dmenta.io/app_metadata').then((app_metadata) => {
          if (this.components[component] === 'undefined') {
            reject()
          }
          if (this.components[component][app_metadata.role] === 'undefined') {
            reject()
          }
          if (this.components[component][app_metadata.role][permission]) {
            resolve()
          }else{
            reject()
          }
        })
      })
      return canPromise
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$acl = acl
  }
}

