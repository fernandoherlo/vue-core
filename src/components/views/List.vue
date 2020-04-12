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
      firstOnPerPage: true
    }
  },
  created () {
    // Degub
    this.$log.debug('LIST')
    this.$nextTick(() => {
      // ACL
      if (this.$auth.authenticated) {
        this.$acl.can(this.config.options.coreExtendScopePl, 'Create').then(() => {
          this.canCreateNew = true
        }).catch(() => {
          this.$log.warn('Create')
        })
        this.$acl.can(this.config.options.coreExtendScopePl, 'Delete').then(() => {
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
      return this.$store.getters['all' + this.config.options.coreExtendVuexPl]
    }
  },
  methods: {
    __created () {
      // Degub
      this.$log.debug('EDIT')
    },
    __refresh () {
      // Degub
      this.$log.debug('LIST')
      this.$store.dispatch('getAll' + this.config.options.coreExtendVuexPl).then(() => {
        // Associate
        if (this.config.options.coreVuexAssociate) {
          if (Array.isArray(this.config.options.coreVuexAssociate)) {
            this.config.options.coreVuexAssociate.forEach((associate) => {
              this.$store.dispatch('getAll' + associate)
            })
          } 
        }
      })
    },
    __newItem () {
      // Degub
      this.$log.debug('LIST')
      this.$router.push({name: this.config.options.coreExtendScope + '-new'})
    },
    __edit (id) {
      // Degub
      this.$log.debug('LIST')
      this.$router.push({name: this.config.options.coreExtendScope, params: { id: id }})
    },
    __confirmDelete (id) {
      // Degub
      this.$log.debug('LIST')
      // Reset
      this.confirm = {}
      // Delete
      this.$store.dispatch('get' + this.config.options.coreExtendVuex, id).then(() => {
        this.$store.dispatch('delete' + this.config.options.coreExtendVuex, this.$store.getters[this.config.options.coreExtendVuex]).then(() => {
          // Associate
          if (this.config.options.coreVuexAssociate) {
            if (Array.isArray(this.config.options.coreVuexAssociate)) {
              this.config.options.coreVuexAssociate.forEach((associate) => {
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
    }
  }
}
</script>

<template>
  <div class="List" :class="config.options.coreExtendScopePl" ref="listdefault">
    <div class="header">
      <h2 class="hidden-print">{{ config.options.displayName }}</h2>
      <h2 class="only-print">{{ config.options.displayNamePrint }}</h2>
    </div>
    <template v-if="__checkComponentExists(config.options.coreExtendScopePl + '-filters')">
      <div class="filters">
        <span class="filter-icon">
          <b-btn id="popoverFilter" variant="outline-primary">
            <icon name="filter"></icon>
          </b-btn>
        </span>
        <div :is="config.options.coreExtendScopePl + '-filters'" ref="filtersdefault"></div>
      </div>
    </template>
    <div class="actions" id="popoverContent">
      <a class="btn new" @click="__newItem()" v-if="canCreateNew">
        <span v-html="config.options.buttons.newName" :title="config.options.buttons.newName" v-if="config.options.buttons.newName"></span>
        <icon name="plus-circle" v-else></icon>
      </a>
      <template v-if="__checkComponentExists(config.coreExtendScopePl + '-btns')">
        <div :is="config.options.coreExtendScopePl + '-btns'" ref="btnsdefault"></div>
      </template>
      <span class="action-icon">
        <b-btn id="popoverAction" variant="outline-primary">
          <icon name="ellipsis-v"></icon>
        </b-btn>
      </span>
      <b-popover target="popoverAction" placement="bottomleft" container="popoverContent">
        <div class="action-wrap">
          <a class="btn print" @click="$helper.print()">
            <span v-html="config.options.buttons.printName" :title="config.options.buttons.printName" v-if="config.options.buttons.printName"></span>
            <icon name="print" v-else></icon>
          </a>
          <a class="btn refresh" @click="__refresh()">
            <span v-html="config.options.buttons.refreshName" :title="config.options.buttons.refreshName" v-if="config.options.buttons.refreshName"></span>
            <icon name="sync-alt" v-else></icon>
          </a>
        </div>
      </b-popover>
    </div>
    <vue-good-table ref="VueGoodTable" :columns="config.table.columns" :rows="itemsVuex" v-if="itemsVuex && itemsVuex.length" :lineNumbers="config.table.lineNumbers" @on-selected-rows-change="__selectionChanged" :select-options="config.table.selectOptions" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" :pagination-options="config.table.paginationOptions" styleClass="table table-bordered table-hover" @on-per-page-change="__onPageChanged">
      <div slot="selected-row-actions">
        <template v-if="__checkComponentExists(config.options.coreExtendScopePl + '-list-actions')">
          <div :is="config.options.coreExtendScopePl + '-list-actions'" ref="rowactionsdefault"></div>
        </template>
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.thClass === 'actions'">
          <template v-if="__checkConditionRowActions(props.row)">
            <a class="btn edit" @click="__edit(props.row.id)" v-if="canEdit">
              <span v-html="config.options.buttons.editName" :title="config.options.buttons.editName" v-if="config.options.buttons.editName"></span>
              <icon name="edit" v-else></icon>
            </a>
            <a class="btn delete" @click="__delete(props.row.id)" v-if="!confirm[props.row.id] && canDelete">
              <span v-html="config.options.buttons.deleteName" :title="config.options.buttons.deleteName" v-if="config.options.buttons.deleteName"></span>
              <icon name="trash-alt" v-else></icon>
            </a>
            <a class="btn delete ask" @click="__confirmDelete(props.row.id)" v-if="confirm[props.row.id] && canDelete">
              <span v-html="config.options.buttons.askName" :title="config.options.buttons.askName" v-if="config.options.buttons.askName"></span>
              <icon name="check-circle" v-else></icon>
            </a>
            <a class="btn cancel" @click="__cancelDelete(props.row.id)" v-if="confirm[props.row.id]">
              <span v-html="config.options.buttons.cancelName" :title="config.options.buttons.cancelName" v-if="config.options.buttons.cancelName"></span>
              <icon name="ban" v-else></icon>
            </a>
          </template>
          <template v-if="__checkComponentExists(config.options.coreExtendScopePl + '-actions')">
            <div :is="config.options.coreExtendScopePl + '-actions'" ref="actionsdefault" :props="props"></div>
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
