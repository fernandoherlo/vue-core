<script>
/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponent from '@/components/Core'
import Form from '@/components/Form'
import componentConfig from '@/components/component'

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponent,
  data () {
    return {
      itemID: 0,
      Form: Form,
      extrasForm: {},
      isNew: false,
      config: componentConfig
    }
  },
  created() {
    // Component
    Vue.component(this.config.coreExtendScopePl + '-form', this.Form)
    // Data
    this.itemID = parseInt(this.$route.params.id)
    this.$store.dispatch('get' + this.config.coreExtendVuex, this.itemID)
    // Created children
    this.__created ()
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['all' + this.config.coreExtendVuexPl]
    },
    itemVuex () {
      return this.$store.getters['clone' + this.config.coreExtendVuex]
    }
  },
  watch: {
    itemsVuex: function () {
      this.$store.dispatch('get' + this.config.coreExtendVuex, this.itemID)
    }
  },
  methods: {
    __created () {
    },
    __update () {
      this.$store.dispatch('update' + this.config.coreExtendVuex, this.itemVuex)
    },
    __save () {
      this.$store.dispatch('save' + this.config.coreExtendVuex, this.itemVuex).then(() => {
        this.$router.replace({name: this.config.coreExtendScope, params: { id: this.itemVuex.id }})
      })
    },
  }
}
</script>

<template>
  <div class="Edit">
    <div class="header">
      <h2>{{ config.displayName }}</h2>
    </div>
    <div class="actions">
      <router-link class="btn btn-info" :to="{ name: config.coreExtendScopePl }">{{ config.buttonBackName }}</router-link>
      <a v-if="!isNew" class="btn btn-primary" @click="__update()" tabindex="0">{{ config.buttonUpdateName }}</a>
      <a v-if="isNew" class="btn btn-primary" @click="__save()" tabindex="0">{{ config.buttonSaveName }}</a>
    </div>
    <div class="form" v-if="itemsVuex && itemVuex">
      <div :is="config.coreExtendScopePl + '-form'" :item="itemVuex" :extrasForm="extrasForm" :is-new="isNew" ref="formdefault"></div>
    </div>
  </div>
</template>

<style lang="sass">
</style>
