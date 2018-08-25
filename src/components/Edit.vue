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
      itemIDParent: 0,
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
    this.itemID = this.$helper.getID(this.$route.params.id)
    this.$store.dispatch('get' + this.config.coreExtendVuex, this.itemID)
    // Inline
    if (this.config.inline) {
      this.itemIDParent = this.$helper.getID(this.$route.params.id_parent)
    }
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
      if (this.itemID){
        this.$store.dispatch('get' + this.config.coreExtendVuex, this.itemID)
      }
    }
  },
  methods: {
    __created () {
    },
    __update () {
      this.$store.dispatch('update' + this.config.coreExtendVuex, this.itemVuex)
    },
    __save () {
      // Inline
      if (this.config.inline) {
        this.itemVuex.id_parent = this.itemIDParent
      }
      this.$store.dispatch('save' + this.config.coreExtendVuex, this.itemVuex).then((itemApi) => {
        if (this.config.backOnSave) {
          this.__back()
        } else {
          this.$router.replace({name: this.config.coreExtendScope, params: { id: itemApi.id }})
        }
      })
    },
    __back () {
      if (this.config.inline) {
        this.$router.replace({name: this.config.coreExtendScopeParent, params: { id: this.itemIDParent }})
      } else {
        this.$router.replace({name: this.config.coreExtendScopePl })
      }
    }
  }
}
</script>

<template>
  <div class="Edit">
    <div class="header">
      <h2>{{ config.displayName }}</h2>
    </div>
    <div class="actions">
      <a class="btn back" @click="__back()" tabindex="0"><span v-html="config.buttonBackName"></span></a>
      <a v-if="!isNew" class="btn update" @click="__update()" tabindex="0"><span v-html="config.buttonUpdateName"></span></a>
      <a v-if="isNew" class="btn save" @click="__save()" tabindex="0"><span v-html="config.buttonSaveName"></span></a>
    </div>
    <div class="form" v-if="itemsVuex && itemVuex">
      <div :is="config.coreExtendScopePl + '-form'" :item="itemVuex" :extrasForm="extrasForm" :is-new="isNew" ref="formdefault"></div>
    </div>
  </div>
</template>

<style lang="sass">
</style>
