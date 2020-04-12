<script>
/*
|--------------------------------------------------------------------------
| Core.vue
|--------------------------------------------------------------------------
|
*/
export default {
  methods: {
  },
  beforeRouteUpdate(to, from, next) {
    // Degub
    this.$log.debug(to)
    this.$log.debug(from)
    this.name = to.params.name
    next()
  }
}
</script>
