<template>
  <div id="app">

    <!-- Notification -->
    <notifications group="global" position="bottom left"></notifications>

    <!-- Content -->
    <transition name="fade">
      <div class="content" v-show="isLoading">
        <!-- Navbar -->
        <b-navbar type="dark" variant="primary" fixed="top" toggleable>
          <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
          <b-collapse is-nav id="nav_dropdown_collapse">
            <b-navbar-nav>
              <b-nav-item v-if="authenticated" :to="{ name: 'dashboard' }">Dashboard</b-nav-item>
              <b-nav-item v-if="authenticated" :to="{ name: 'comments' }">Comments</b-nav-item>
              <b-nav-item v-if="authenticated" :to="{ name: 'posts' }">Posts</b-nav-item>
              <b-nav-item v-if="authenticated" :to="{ name: 'users' }">Users</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item class="login" v-if="!authenticated" @click="$auth.login()" right><icon name="user-alt"></icon> Entrar</b-nav-item>
              <b-nav-item class="logout" v-if="authenticated" @click="$auth.logout()" right><icon name="sign-out-alt"></icon> Salir</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

        <!-- View -->
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <router-view :auth="auth" :authenticated="authenticated"></router-view>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Loading -->
    <transition name="fade">
      <div class="loading" v-if="!isLoading">
        <icon name="sync" scale="3" spin></icon>
        <p v-html="loadMsg"></p>
      </div>
    </transition>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { initialGetters } from './store/modules'
import Events from '@/mixins/events'

export default {
  name: 'App',
  mixins: [Events],
  data () {
    return {
      auth: this.$auth,
      authenticated: this.$auth.authenticated,
      email: ''
    }
  },
  computed: mapGetters({
    isLoading: 'load',
    loadMsg: 'loadMsg'
  }),
  created () {
    // LOAD MODULES STORE
    this.$store.dispatch('loadBaseData', initialGetters)
  }
}
</script>

<style lang="scss">
  @import './assets/app.scss';
</style>
