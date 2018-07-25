// EVENTS
export default {
  created () {
    this.$EventBus.$on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    this.$EventBus.$on('goRouter', (route, force) => {
      this.$router.push(route, function (){
        if (force){
          window.location.reload(true)
        }
      })
    })
    this.$EventBus.$on('apiGet', (url, callback) => {
      this.$api.get(url, callback)
    })
    this.$EventBus.$on('apiUpdate', (url, item, callback) => {
      this.$api.update(url, item, callback)
    })
    this.$EventBus.$on('apiSave', (url, item, callback) => {
      this.$api.save(url, item, callback)
    })
    this.$EventBus.$on('apiDelete', (url, item, callback) => {
      this.$api.delete(url, item, callback)
    })
  }
}
