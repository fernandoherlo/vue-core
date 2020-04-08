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
import componentConfig from '@/components/config'

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
      config: componentConfig,
      canCreateNew: false,
      canUpdate: false,
      saveDisable: false,
      updateDisable: false,
    }
  },
  created() {
    // Degub
    this.$log.debug('EDIT')
    // pre-Created children
    this.__precreated()
    // Component
    Vue.component(this.config.formName + '-form', this.Form)
    // ACL
    if (this.$auth.authenticated) {
      this.$acl.can(this.config.coreExtendScopePl, 'Create').then(() => {
        this.canCreateNew = true
      }).catch(() => {
        this.$log.warn('Create')
      })
      this.$acl.can(this.config.coreExtendScopePl, 'Update').then(() => {
        this.canUpdate = true
      }).catch(() => {
        this.$log.warn('Update')
      })
    }
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
    this.__created()
    // Created __construct new
    this.__construct()
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
    },
    itemVuex: function (itemValue) {
      this.$EventBus.$emit('loadItemVuex' + this.config.coreExtendScope, itemValue)
    }
  },
  methods: {
    __construct () {
      // Degub
      this.$log.debug('EDIT')
      // 400 ms and VALIDATE!
      setTimeout(() => {
        // Validate
        this.$nextTick(() => {
          this.$refs.formdefault.$children.forEach(vm => {
            vm.$validator.validate()
          })
          this.$refs.formdefault.$validator.validate()
        })
      }, 400)
    },
    __created () {
      // Degub
      this.$log.debug('EDIT')
    },
    __update () {
      // Degub
      this.$log.debug('EDIT')
      this.updateDisable = true
      this.$validator.validateAll('formDefaultValidate').then(() => {
        if (this.errors.items.length === 0) {
          this.$store.dispatch('update' + this.config.coreExtendVuex, this.itemVuex).then(() => {
            this.updateDisable = false
            // Associate
            if (this.config.coreVuexAssociate) {
              if (Array.isArray(this.config.coreVuexAssociate)) {
                this.config.coreVuexAssociate.forEach((associate) => {
                  this.$store.dispatch('getAll' + associate)
                })
              } 
            }
            if (this.config.backOnUpdate) {
              this.__back()
            }
          })
        } else {
          this.updateDisable = false
        }
      })
    },
    __save () {
      // Degub
      this.$log.debug('EDIT')
      this.saveDisable = true
      this.$validator.validateAll('formDefaultValidate').then(() => {
        if (this.errors.items.length === 0) {
          // Inline
          if (this.config.inline) {
            this.itemVuex.id_parent = this.itemIDParent
          }
          this.$store.dispatch('save' + this.config.coreExtendVuex, this.itemVuex).then((itemApi) => {
            // this.saveDisable = false
            // Associate
            if (this.config.coreVuexAssociate) {
              if (Array.isArray(this.config.coreVuexAssociate)) {
                this.config.coreVuexAssociate.forEach((associate) => {
                  this.$store.dispatch('getAll' + associate)
                })
              } 
            }
            this.save(itemApi, () => {
              if (this.config.backOnSave) {
                this.__back()
              } else {
                this.$router.replace({name: this.config.coreExtendScope, params: { id: itemApi.id }})
              }
            })
          })
        } else {
          this.saveDisable = false
        }
      })
    },
    save (itemApi, callback) {
      // Degub
      this.$log.debug('EDIT')
      callback()
    },
    __back () {
      // Degub
      this.$log.debug('EDIT')
      if (this.config.inline) {
        this.$router.replace({name: this.config.coreExtendScopeParent, params: { id: this.itemIDParent }})
      } else {
        this.$router.replace({name: this.config.coreExtendScopePl })
      }
    },
    __checkComponentExists (name) {
      // Degub
      this.$log.debug('EDIT')
      if (this.$options.components[name]) {
        return true
      }
      return false
    }
  }
}
</script>

<template>
  <div class="Edit" :class="config.coreExtendScopePl">
    <div class="header" v-if="itemVuex">
      <h2 class="hidden-print">{{ config.displayName }}: <span v-if="!isNew">{{ itemVuex[config.fieldID] }}</span></h2>
      <h2 class="only-print">{{ config.displayNamePrint }}: <span v-if="!isNew">{{ itemVuex[config.fieldID] }}</span></h2>
    </div>
    <div class="actions" id="popoverContent">
      <a class="btn back" @click="__back()" tabindex="0">
        <span v-html="config.buttons.backName" :title="config.buttons.backName" v-if="config.buttons.backName"></span>
        <icon name="arrow-left" v-else></icon>
      </a>
      <a v-if="!isNew && canUpdate" class="btn update" :class="{ disabled: updateDisable }" @click="__update()" tabindex="0">
        <span v-html="config.buttons.updateName" :title="config.buttons.updateName" v-if="config.buttons.updateName"></span>
        <icon name="save" v-else></icon>
      </a>
      <a v-if="isNew && canCreateNew" class="btn save" :class="{ disabled: saveDisable }" @click="__save()" tabindex="0">
        <span v-html="config.buttons.saveName" :title="config.buttons.saveName" v-if="config.buttons.saveName"></span>
        <icon name="save" v-else></icon>
      </a>
      <span class="action-icon">
        <b-btn id="popoverAction" variant="outline-primary">
          <icon name="ellipsis-v"></icon>
        </b-btn>
      </span>
      <b-popover ref="popover" target="popoverAction" placement="bottomleft" container="popoverContent">
        <div class="action-wrap">
          <a class="btn print" @click="$helper.print()">
            <span v-html="config.buttons.printName" :title="config.buttons.printName" v-if="config.buttons.printName"></span>
            <icon name="print" v-else></icon>
          </a>
          <template v-if="__checkComponentExists(config.coreExtendScopePl + '-edit-btns')">
            <div :is="config.coreExtendScopePl + '-edit-btns'" ref="editbtnsdefault"></div>
          </template>
        </div>
      </b-popover>
      <!-- Bootstrap-vue new version no ref buttons, only when show popover. now use this ref  -->
      <template v-if="__checkComponentExists(config.coreExtendScopePl + '-edit-btns')">
        <div :is="config.coreExtendScopePl + '-edit-btns'" ref="editbtnsdefaultOut" class="hidden-print d-none"></div>
      </template>
    </div>
    <div class="form" v-if="itemVuex">
      <div :is="config.formName + '-form'" :item="itemVuex" :extrasForm="extrasForm" :is-new="isNew" ref="formdefault"></div>
    </div>
  </div>
</template>

<style lang="sass">
</style>
