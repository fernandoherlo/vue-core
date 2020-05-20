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
      firstOnPerPage: true,
      vuexPreFilter: null,
    }
  },
  created () {
    // Degub
    this.$log.debug('LIST')
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
    // Created children
    this.__created()
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['all' + this.config.options.nameVuex]
    },
    itemsVuexPreFilter () {
      if ( ! this.vuexPreFilter) {
        return this.itemsVuex
      } else {
        return this.itemsVuex.filter(this.vuexPreFilter)
      }
    }
  },
  methods: {
    __created () {
      // Degub
      this.$log.debug('LIST')
    },
    __refresh () {
      // Degub
      this.$log.debug('LIST')
      this.loading = false
      this.$store.dispatch('getAll' + this.config.options.name).then(() => {
        this.loading = true
        // Associate
        if (this.config.options.storesReloadOnCRUD) {
          if (Array.isArray(this.config.options.storesReloadOnCRUD)) {
            this.config.options.storesReloadOnCRUD.forEach((associate) => {
              this.$store.dispatch('getAll' + associate)
            })
          } 
        }
      })
    },
    __newItem () {
      // Degub
      this.$log.debug('LIST')
      if (this.config.options.nameSingleOverride) {
        this.$router.push({name: this.config.options.nameSingleOverride + '-new'})
      } else {
        this.$router.push({name: this.config.options.nameSingle + '-new'})
      }
    },
    __edit (id) {
      // Degub
      this.$log.debug('LIST')
      if (this.config.options.nameSingleOverride) {
        this.$router.push({name: this.config.options.nameSingleOverride, params: { id: id }})
      } else {
        this.$router.push({name: this.config.options.nameSingle, params: { id: id }})
      }
    },
    __confirmDelete (id) {
      // Degub
      this.$log.debug('LIST')
      // Reset
      this.confirm = {}
      // Delete
      this.$store.dispatch('get' + this.config.options.nameSingle, id).then(() => {
        this.$store.dispatch('delete' + this.config.options.nameSingle, this.$store.getters[this.config.options.nameSingleVuex], this.config).then(() => {
          // Associate
          if (this.config.options.storesReloadOnCRUD) {
            if (Array.isArray(this.config.options.storesReloadOnCRUD)) {
              this.config.options.storesReloadOnCRUD.forEach((associate) => {
                this.$store.dispatch('getAll' + associate)
              })
            } 
          }
        })
      })
    },
    __cancelDelete (id) {
      // Degub
      this.$log.debug('LIST')
      // Confirm false
      this.$set(this.confirm, id, false)
    },
    __delete (id) {
      // Degub
      this.$log.debug('LIST')
      // Reset
      this.confirm = {}
      // Confirm
      this.$set(this.confirm, id, true)
    },
    __checkComponentExists (name) {
      if (this.$options.components[name]) {
        return true
      }
      return false
    },
    __checkConditionRowActions (row) {
      if (this.config.options.conditionRowActions) {
        return this.config.options.conditionRowActions(row)
      } else {
        return true;
      }
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

    <div class="vgt-wrap" v-if="itemsVuexPreFilter && itemsVuexPreFilter.length && loading">
      <div class="vgt-inner-wrap">
        <div class="vgt-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <th>Elemento</th>
            </thead>
            <tbody>
              <draggable v-model="itemsVuexPreFilter">
                <transition-group>
                    <tr v-for="element in itemsVuexPreFilter" :key="element.id">
                        <th>{{element.name}}</th>
                    </tr>
                </transition-group>
              </draggable>
            </tbody>
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
