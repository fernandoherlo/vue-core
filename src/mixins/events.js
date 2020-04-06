// EVENTS
export default {
  created () {
    this.$EventBus.$on('apiGet', (url, callback) => {
      // Degub
      this.$log.debug('EVENTS -> apiGet', url)
      this.$api.get(url, callback)
    })
    this.$EventBus.$on('apiUpdate', (url, item, callback) => {
      // Degub
      this.$log.debug('EVENTS -> apiUpdate', url)
      this.$api.update(url, item, callback)
    })
    this.$EventBus.$on('apiSave', (url, item, callback) => {
      // Degub
      this.$log.debug('EVENTS -> apiSave', url)
      this.$api.save(url, item, callback)
    })
    this.$EventBus.$on('apiDelete', (url, item, callback, wait, id_parent) => {
      // Degub
      this.$log.debug('EVENTS -> apiDelete', url)
      this.$api.delete(url, item, callback, wait, id_parent)
    })
  }
}
