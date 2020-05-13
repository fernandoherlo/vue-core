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
| vue-good-table
|--------------------------------------------------------------------------
|
*/
import { VueGoodTable } from 'vue-good-table';

/*
|--------------------------------------------------------------------------
| Extend
|--------------------------------------------------------------------------
|
*/
export default {
  extends: CoreComponent,
  components: {
    VueGoodTable
  },
  data () {
    return {
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
      // Search Options
      if (this.config.table.searchOptions.enabled) {
        if (this.$refs.VueGoodTable.$children[0].$el) {
          this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].focus()
          this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].select()
        }
      }
      // Per page
      if (this.$root.$children[0].paginateNum) {
        this.$refs.VueGoodTable.perPage = this.$root.$children[0].paginateNum
      }
    })
    // Created children
    this.__created()
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['all' + this.config.options.name]
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
      this.$store.dispatch('getAll' + this.config.options.name).then(() => {
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
        this.$store.dispatch('delete' + this.config.options.nameSingle, this.$store.getters[this.config.options.nameSingle]).then(() => {
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
    __highlight (haystack, props) {
      if (this.$refs.VueGoodTable) {
        if (!this.$refs.VueGoodTable.searchOptions.skipHighlight) {
          if (!props.column.globalSearchDisabled){
            var needle = this.$refs.VueGoodTable.searchTerm
            if (needle) {
              // Disable pagintaion
              this.$refs.VueGoodTable.paginate = false
              // return Highlight
              return this.$helper.search(haystack, needle)
            }
          }
          // Default pagintaion
          this.$refs.VueGoodTable.paginate = this.config.table.paginationOptions.enabled
        } else {
          return haystack
        }
      }
      // return Highlight
      return haystack
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
    },
    __selectionChanged (/*params*/) {
      // 200 ms and JS
      setTimeout(() => {
        // Remove all
        document.querySelectorAll('table tbody input[type="checkbox"]').forEach(function(element) {
          element.parentElement.parentElement.classList.remove('active')
        })
        // Select this
        document.querySelectorAll('table tbody input[type="checkbox"]:checked').forEach(function(element) {
          element.parentElement.parentElement.classList.add('active')
        })
      }, 100)
    },
    __onPageChanged (params) {
      // Degub
      this.$log.debug('LIST')
      if (this.firstOnPerPage) {
        // Per page
        if (this.$root.$children[0].paginateNum) {
          if (this.$refs.VueGoodTable) {
            this.$refs.VueGoodTable.perPage = this.$root.$children[0].paginateNum
          }
        }
      } else {
        this.$root.$children[0].paginateNum = params.currentPerPage
      }
      this.firstOnPerPage = false
    },
    __onSearch(params) {
      // params.searchTerm - term being searched for
      // params.rowCount - number of rows that match search
      // https://www.the-art-of-web.com/javascript/search-highlight/
      this.$log.debug(params.rowCount)
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
    <template v-if="__checkComponentExists(config.options.name + '-filters')">
      <div class="filters">
        <span class="filter-icon">
          <b-btn id="popoverFilter" variant="outline-primary">
            <icon name="filter"></icon>
          </b-btn>
        </span>
        <div :is="config.options.name + '-filters'" ref="filtersdefault"></div>
      </div>
    </template>
    <div class="actions" id="popoverContent">
      <a class="btn new" @click="__newItem()" v-if="canCreateNew">
        <span v-html="config.buttons.newName" :title="config.buttons.newName" v-if="config.buttons.newName"></span>
        <icon name="plus-circle" v-else></icon>
      </a>
      <template v-if="__checkComponentExists(config.options.name + '-btns')">
        <div :is="config.options.name + '-btns'" ref="btnsdefault"></div>
      </template>
      <span class="action-icon">
        <b-btn id="popoverAction" variant="outline-primary">
          <icon name="ellipsis-v"></icon>
        </b-btn>
      </span>
      <b-popover target="popoverAction" placement="bottomleft" container="popoverContent">
        <div class="action-wrap">
          <a class="btn print" @click="$helper.print()">
            <span v-html="config.buttons.printName" :title="config.buttons.printName" v-if="config.buttons.printName"></span>
            <icon name="print" v-else></icon>
          </a>
          <a class="btn refresh" @click="__refresh()">
            <span v-html="config.buttons.refreshName" :title="config.buttons.refreshName" v-if="config.buttons.refreshName"></span>
            <icon name="sync-alt" v-else></icon>
          </a>
        </div>
      </b-popover>
    </div>
    <vue-good-table ref="VueGoodTable" :columns="config.table.columns" :rows="itemsVuexPreFilter" v-if="itemsVuexPreFilter && itemsVuexPreFilter.length" :lineNumbers="config.table.lineNumbers" @on-selected-rows-change="__selectionChanged" :select-options="config.table.selectOptions" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" :pagination-options="config.table.paginationOptions" styleClass="table table-bordered table-hover" @on-per-page-change="__onPageChanged" @on-search="__onSearch">
      <div slot="selected-row-actions">
        <template v-if="__checkComponentExists(config.options.name + '-list-actions')">
          <div :is="config.options.name + '-list-actions'" ref="rowactionsdefault"></div>
        </template>
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.thClass === 'actions'">
          <template v-if="__checkConditionRowActions(props.row)">
            <a class="btn edit" @click="__edit(props.row.id)" v-if="canEdit">
              <span v-html="config.buttons.editName" :title="config.buttons.editName" v-if="config.buttons.editName"></span>
              <icon name="edit" v-else></icon>
            </a>
            <a class="btn delete" @click="__delete(props.row.id)" v-if="!confirm[props.row.id] && canDelete">
              <span v-html="config.buttons.deleteName" :title="config.buttons.deleteName" v-if="config.buttons.deleteName"></span>
              <icon name="trash-alt" v-else></icon>
            </a>
            <a class="btn delete ask" @click="__confirmDelete(props.row.id)" v-if="confirm[props.row.id] && canDelete">
              <span v-html="config.buttons.askName" :title="config.buttons.askName" v-if="config.buttons.askName"></span>
              <icon name="check-circle" v-else></icon>
            </a>
            <a class="btn cancel" @click="__cancelDelete(props.row.id)" v-if="confirm[props.row.id]">
              <span v-html="config.buttons.cancelName" :title="config.buttons.cancelName" v-if="config.buttons.cancelName"></span>
              <icon name="ban" v-else></icon>
            </a>
          </template>
          <template v-if="__checkComponentExists(config.options.name + '-actions')">
            <div :is="config.options.name + '-actions'" ref="actionsdefault" :props="props"></div>
          </template>
        </span>
        <span v-else v-html="__highlight(props.formattedRow[props.column.field], props)">
          {{ props.formattedRow[props.column.field] }} 
        </span>
      </template>
      <div slot="emptystate">
        {{ config.table.noDataText }}
      </div>
    </vue-good-table>
  </div>
</template>

<style lang="scss">
</style>
