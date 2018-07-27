<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <router-link :to="{ name: 'comments'}">Comments</router-link> 
    <h2 v-html="loadMsg"></h2>
    <h4 v-if="authenticated">
        You are logged in!  <a @click="$auth.logout()">Log out</a>
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="$auth.login()">Log In</a> to continue.
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
  }
}
</script>

<style lang="scss">
  @import './assets/app.scss';
</style>
