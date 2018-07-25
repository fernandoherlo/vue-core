<template>
  <div id="app">
    <h4 v-if="authenticated">
        You are logged in!  <a @click="logout()">Log out</a>
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="login()">Log In</a> to continue.
    </h4>
    <router-view :auth="auth" :authenticated="authenticated"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    this.$auth.EventsVue.$on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    this.$auth.EventsVue.$on('goRouter', route => {
      this.$router.replace(route)
    })
    return {
      auth: this.$auth,
      authenticated: this.$auth.authenticated
    }
  },
  created () {
    var options = {
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'GET'
    }
    this.$http.axios(options).then(function (response) {
      var data = response
      console.log(data)
    }, function (response) {
      var data = response
      console.log(data)
    })
  },
  methods: {
    login: function () {
      this.$auth.login()
    },
    logout: function () {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss">
</style>
