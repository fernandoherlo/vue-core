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
    if (!this.isNew) {
      this.itemID = this.$helper.getID(this.$route.params.id)
      this.$store.dispatch('get' + this.config.coreExtendVuex, this.itemID)
    } else {
      this.$store.dispatch('clear' + this.config.coreExtendVuex)
    }
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
      console.log(this.$validator.errorBag)
      if (!this.$validator.errorBag) {
        this.$store.dispatch('update' + this.config.coreExtendVuex, this.itemVuex).then(() => {
          if (this.config.backOnUpdate) {
            this.__back()
          }
        })
      }
    },
    __save () {
      console.log(this.$validator.errorBag)
      if (!this.$validator.errorBag) {
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
      }
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
    <div class="header" v-if="itemVuex">
      <h2 class="hidden-print">{{ config.displayName }}<span v-if="!isNew">: {{ itemVuex[config.fieldID] }}</span></h2>
      <h2 class="only-print">{{ config.displayNamePrint }}<span v-if="!isNew">: {{ itemVuex[config.fieldID] }}</span></h2>
    </div>
    <div class="actions">
      <a class="btn print" @click="$helper.print()"><span v-html="config.buttons.printName" :title="config.buttons.printName"></span></a>
      <a class="btn back" @click="__back()" tabindex="0"><span v-html="config.buttons.backName" :title="config.buttons.backName"></span></a>
      <a v-if="!isNew" class="btn update" @click="__update()" tabindex="0"><span v-html="config.buttons.updateName" :title="config.buttons.updateName"></span></a>
      <a v-if="isNew" class="btn save" @click="__save()" tabindex="0"><span v-html="config.buttons.saveName" :title="config.buttons.saveName"></span></a>
    </div>
    <div class="form" v-if="itemVuex">
      <div :is="config.coreExtendScopePl + '-form'" :item="itemVuex" :extrasForm="extrasForm" :is-new="isNew" ref="formdefault"></div>
    </div>
  </div>
</template>

<style lang="sass">
</style>
