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
      if (this.$refs.VueGoodTable.$children[0].$el) {
        this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].focus()
        this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].select()
      }
    })
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['all' + this.config.coreExtendVuexPl]
    }
  },
  methods: {
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
            return this.$helper.search(haystack, needle)
          }
        }
      }
      return haystack
    },
  }
}
</script>

<template>
  <div class="List">
    <div class="header">
      <h2>{{ config.displayName }}</h2>
    </div>
    <div class="actions">
      <a class="btn new" @click="__newItem()"><span v-html="config.buttonNewName"></span></a>
    </div>
    <vue-good-table ref="VueGoodTable" :columns="config.table.columns" :rows="itemsVuex" :lineNumbers="config.table.lineNumbers" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" styleClass="table table-bordered table-hover">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.thClass === 'actions'">
          <a class="btn edit" @click="__edit(props.row.id)"><span v-html="config.buttonEditName"></span></a>
          <a class="btn delete" @click="__delete(props.row.id)" v-if="!confirm[props.row.id]"><span v-html="config.buttonDeleteName"></span></a>
          <a class="btn delete ask" @click="__confirmDelete(props.row.id)" v-if="confirm[props.row.id]"><span v-html="config.buttonAskDeleteName"></span></a>
          <a class="btn cancel" @click="__cancelDelete(props.row.id)" v-if="confirm[props.row.id]"><span v-html="config.buttonCancelName"></span></a>
        </span>
        <span v-else v-html="__highlight(props.formattedRow[props.column.field], props)">
          {{ props.formattedRow[props.column.field] }} 
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<style lang="sass">
.highlight
  background: yellow;
</style>
