<template>
  <div id="app">

    <h2 v-html="loadMsg"></h2>
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
import { mapGetters } from 'vuex'
import { modules } from './store/modules'
import events from '@/mixins/events'

export default {
  name: 'App',
  mixins: [events],
  data () {
    return {
      auth: this.$auth,
      authenticated: this.$auth.authenticated
    }
  },
  computed: mapGetters({
    isLoading: 'load',
    loadMsg: 'loadMsg'
  }),
  created () {
    // LOAD MODULES STORE
    this.$store.dispatch('loadBaseData', modules)
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
