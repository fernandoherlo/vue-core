<template>
  <div>
    Callback
  </div>
</template>

<script>
  export default {
    name: 'callback',
    props: ['auth'],
    data () {
      // Degub
      this.$log.debug('callback', this.$auth.authenticated)
      if (!this.$auth.authenticated) {
        this.$auth.handleAuthentication()
      }else{
        this.$router.push('/dashboard')
      }
      return {}
    }
  }
</script>

<style>
</style>