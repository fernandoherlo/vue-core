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
    VueGoodTable,
  },
  data () {
    return {
      itemIDParent: 0,
      items: [],
      confirm: {},
      config: componentConfig
    }
  },
  created () {
    // Data
    this.itemIDParent = this.$helper.getID(this.$route.params.id)
    this.$store.dispatch('getByParent' + this.config.coreExtendVuexPl, this.itemIDParent)
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['allByParent' + this.config.coreExtendVuexPl]
    }
  },
  methods: {
    __newItem () {
      this.$router.push({name: this.config.coreExtendScope + '-new', params: { id_parent: this.itemIDParent }})
    },
    __edit (id) {
      this.$router.push({name: this.config.coreExtendScope, params: { id: id, id_parent: this.itemIDParent }})
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
  <div class="List Inline">
    <div class="header">
      <h3 class="hidden-print">{{ config.displayName }}</h3>
      <h3 class="only-print">{{ config.displayNamePrint }}</h3>
    </div>
    <div class="actions">
      <template v-if="__checkComponentExists(config.coreExtendScopePl + '-btns')">
        <div :is="config.coreExtendScopePl + '-btns'" ref="btnsinline"></div>
      </template>
    </div>
    <vue-good-table ref="VueGoodTableInline" :columns="config.table.columns" :rows="itemsVuex" :lineNumbers="config.table.lineNumbers" :select-options="config.table.selectOptions" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" :pagination-options="config.table.paginationOptions" styleClass="table table-bordered table-hover">
      <div slot="selected-row-actions">
        <template v-if="__checkComponentExists(config.coreExtendScopePl + '-row-actions')">
          <div :is="config.coreExtendScopePl + '-row-actions'" ref="rowactionsinline"></div>
        </template>
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.thClass === 'actions'">
          <a class="btn edit" @click="__edit(props.row.id)"><span v-html="config.buttons.editName" title="{{ config.buttons.editName }}"></span></a>
          <a class="btn delete" @click="__delete(props.row.id)" v-if="!confirm[props.row.id]"><span v-html="config.buttons.deleteName" title="{{ config.buttons.deleteName }}"></span></a>
          <a class="btn delete ask" @click="__confirmDelete(props.row.id)" v-if="confirm[props.row.id]"><span v-html="config.buttons.askName" title="{{ config.buttons.askName }}"></span></a>
          <a class="btn cancel" @click="__cancelDelete(props.row.id)" v-if="confirm[props.row.id]"><span v-html="config.buttons.cancelName" title="{{ config.buttons.cancelName }}"></span></a>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <div class="actions">
      <a class="btn new" @click="__newItem()"><span v-html="config.buttons.newName"></span></a>
    </div>
  </div>
</template>

<style lang="sass">
</style>
