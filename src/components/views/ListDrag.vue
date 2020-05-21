<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponent from '@/components/views/Core'
import componentConfig from '@/components/config'

/*
|--------------------------------------------------------------------------
| vuedraggable
|--------------------------------------------------------------------------
|
*/
import draggable from 'vuedraggable'
import _ from 'lodash'

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponent,
  components: {
    draggable
  },
  data () {
    return {
      loading: true,
      items: [],
      confirm: {},
      config: componentConfig,
      canEdit: true,
      canCreateNew: false,
      canDelete: false,
      saveDisable: false,
      itemsVuexClone: [],
      itemsOrder: []
    }
  },
  created () {
    // Degub
    this.$log.debug('DRAG')
    // pre-Created children
    this.__precreated()
    
    this.$nextTick(() => {
      // ACL
      if (this.$auth.authenticated) {
        this.$acl.can(this.config.options.name, 'Create').then(() => {
          this.canCreateNew = true
        }).catch(() => {
          this.$log.warn('Create')
        })
        this.$acl.can(this.config.options.name, 'Delete').then(() => {
          this.canDelete = true
        }).catch(() => {
          this.$log.warn('Delete')
        })
      }
    })

    let dataClone = []
    if (this.config.options.inline) {
      // Data
      this.itemIDParent = this.$helper.getID(this.$route.params.id_parent)
      this.$store.dispatch('getByParent' + this.config.options.name, this.itemIDParent).then( () => {
        dataClone = this.$store.getters['allByParent' + this.config.options.nameVuex]
        // Clone
        this.itemsVuexClone = _.orderBy( _.clone(dataClone), ['order'])
        this.loading = true
      })
    } else {
      // Clone
      dataClone = this.$store.getters['all' + this.config.options.nameVuex]
      // Clone
      this.itemsVuexClone = _.orderBy( _.clone(dataClone), ['order'])
    }

    // Created children
    this.__created()
  },
  methods: {
    __created () {
      // Degub
      this.$log.debug('DRAG')
    },
    __precreated () {
      // Degub
      this.$log.debug('DRAG')
    },
    __save () {
      // Degub
      this.$log.debug('DRAG')
      this.saveDisable = true

      this.itemsOrder = []
      this.itemsVuexClone.forEach( (element, index) => {
         this.itemsOrder.push({
          id: element.id,
          order: index+1,
         })
      })

      // Data
      let IDParentOrder = null
      if (this.config.options.inline) {
        IDParentOrder = this.itemIDParent
      }
      let item_payload = {
        'item': this.itemsOrder,
        'id_parent': IDParentOrder,
      }
      // order
      this.$store.dispatch('order' + this.config.options.nameSingle, item_payload).then(() => {
        this.saveDisable = false
        // Associate
        if (this.config.options.storesReloadOnCRUD) {
          if (Array.isArray(this.config.options.storesReloadOnCRUD)) {
            this.config.options.storesReloadOnCRUD.forEach((associate) => {
              this.$store.dispatch('getAll' + associate)
            })
          } 
        }
        if (this.config.options.backOnUpdate) {
          this.__back()
        }
      })

    },
    __back () {
      // Degub
      this.$log.debug('DRAG')
      if (this.config.options.inline) {
        this.$router.replace({name: this.config.options.nameSinglePluginBack, params: { id: this.itemIDParent }})
      } else {
        if (this.config.options.nameOverride) {
          this.$router.replace({name: this.config.options.nameOverride })
        } else {
          this.$router.replace({name: this.config.options.name })
        }
      }
    },
    __checkComponentExists (name) {
      // Degub
      this.$log.debug('DRAG')
      if (this.$options.components[name]) {
        return true
      }
      return false
    }
  }
}
</script>

<template>
  <div class="List" :class="config.options.name" ref="listdefault">

    <template v-if="config.options.hasSubMenu">
      <div :is="config.options.hasSubMenu" class="submenu-core"></div>
    </template>
  
    <div class="header">
      <h2 class="hidden-print">{{ config.options.displayName }}</h2>
      <h2 class="only-print">{{ config.options.displayNamePrint }}</h2>
    </div>

    <div class="actions" id="popoverContent">
     <a class="btn back" @click="__back()" tabindex="0">
        <span v-html="config.buttons.backName" :title="config.buttons.backName" v-if="config.buttons.backName"></span>
        <icon name="arrow-left" v-else></icon>
      </a>
      <a v-if="canCreateNew" class="btn save" :class="{ disabled: saveDisable }" @click="__save()" tabindex="0">
        <span v-html="config.buttons.saveName" :title="config.buttons.saveName" v-if="config.buttons.saveName"></span>
        <icon name="save" v-else></icon>
      </a>
    </div>

    <div class="vgt-wrap" v-if="itemsVuexClone && itemsVuexClone.length && loading">
      <div class="vgt-inner-wrap">
        <div class="vgt-responsive">
          <table class="table table-bordered table-hover table-drag">
            <thead>
              <th>Elemento</th>
            </thead>
            <draggable v-model="itemsVuexClone" tag="tbody">
              <tr v-for="element in itemsVuexClone" :key="element.id">
                <template v-if="__checkComponentExists(config.options.name + '-element')">
                  <div :is="config.options.name + '-element'" :element="element"></div>
                </template>
                <template v-else>
                  <td>{{element.name}}</td>
                </template>
              </tr>
            </draggable>
          </table>
        </div>
      </div>
    </div>

    <template v-if="!loading">
      <div class="loading inline">
        <icon name="circle-notch" scale="1" spin></icon>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
</style>
