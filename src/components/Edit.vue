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
        this.$router.push({name: this.config.coreExtendScope, params: { id: this.itemVuex.id }})
      })
    },
  }
}
</script>

<template>
  <div class="form" v-if="itemsVuex && itemVuex">
    <div :is="config.coreExtendScopePl + '-form'" :item="itemVuex" :extrasForm="extrasForm" :is-new="isNew" ref="formdefault"></div>

    <a v-if="!isNew" class="btn btn-raised btn-success" @click="__update()" tabindex="0">Update</a>
    <a v-if="isNew" class="btn btn-raised btn-success" @click="__save()" tabindex="0">Save</a>
  </div>
</template>

<style lang="sass">
</style>
