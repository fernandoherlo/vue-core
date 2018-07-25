<template>
  <div class="spinner">
    Loading...
  </div>
</template>

<script>
export default {
  name: 'callback',
  props: ['auth'],
  data () {
    this.auth.handleAuthentication()
    return {}
  }
}
</script>

<style>
</style>
