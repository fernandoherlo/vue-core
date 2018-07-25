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