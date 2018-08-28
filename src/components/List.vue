<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponent from '@/components/Core'
import componentConfig from '@/components/component'

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
      config: componentConfig
    }
  },
  created () {
    this.$nextTick(() => {
      if (this.config.table.searchOptions.enabled) {
        if (this.$refs.VueGoodTable.$children[0].$el) {
          this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].focus()
          this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].select()
        }
      }
    })
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['all' + this.config.coreExtendVuexPl]
    }
  },
  methods: {
    __refresh () {
      this.$store.dispatch('getAll' + this.config.coreExtendVuexPl)
    },
    __newItem () {
      this.$router.push({name: this.config.coreExtendScope + '-new'})
    },
    __edit (id) {
      this.$router.push({name: this.config.coreExtendScope, params: { id: id }})
    },
    __confirmDelete (id) {
      // Reset
      this.confirm = {}
      // Delete
      this.$store.dispatch('get' + this.config.coreExtendVuex, id).then(() => {
        this.$store.dispatch('delete' + this.config.coreExtendVuex, this.$store.getters[this.config.coreExtendVuex])
      })
    },
    __cancelDelete (id) {
      // Confirm false
      this.$set(this.confirm, id, false)
    },
    __delete (id) {
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
    }
  }
}
</script>

<template>
  <div class="List">
    <div class="header">
      <h2 class="hidden-print">{{ config.displayName }}</h2>
      <h2 class="only-print">{{ config.displayNamePrint }}</h2>
    </div>
    <div class="actions">
      <a class="btn print" @click="$helper.print()"><span v-html="config.buttons.printName" title="{{ config.buttons.printName }}"></span></a>
      <a class="btn refresh" @click="__refresh()"><span v-html="config.buttons.refreshName" title="{{ config.buttons.refreshName }}"></span></a>
      <a class="btn new" @click="__newItem()"><span v-html="config.buttons.newName" title="{{ config.buttons.newName }}"></span></a>
      <template v-if="__checkComponentExists(config.coreExtendScopePl + '-btns')">
        <div :is="config.coreExtendScopePl + '-btns'" ref="btnsdefault"></div>
      </template>
    </div>
    <vue-good-table ref="VueGoodTable" :columns="config.table.columns" :rows="itemsVuex" :lineNumbers="config.table.lineNumbers" :select-options="config.table.selectOptions" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" :pagination-options="config.table.paginationOptions" styleClass="table table-bordered table-hover">
      <div slot="selected-row-actions">
        <template v-if="__checkComponentExists(config.coreExtendScopePl + '-row-actions')">
          <div :is="config.coreExtendScopePl + '-row-actions'" ref="rowactionsdefault"></div>
        </template>
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.thClass === 'actions'">
          <a class="btn edit" @click="__edit(props.row.id)"><span v-html="config.buttons.editName" title="{{ config.buttons.editName }}"></span></a>
          <a class="btn delete" @click="__delete(props.row.id)" v-if="!confirm[props.row.id]"><span v-html="config.buttons.deleteName" title="{{ config.buttons.deleteName }}"></span></a>
          <a class="btn delete ask" @click="__confirmDelete(props.row.id)" v-if="confirm[props.row.id]"><span v-html="config.buttons.askName" title="{{ config.buttons.askName }}"></span></a>
          <a class="btn cancel" @click="__cancelDelete(props.row.id)" v-if="confirm[props.row.id]"><span v-html="config.buttons.cancelName" title="{{ config.buttons.cancelName }}"></span></a>
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

<style lang="sass">
.highlight
  background: yellow;
</style>
