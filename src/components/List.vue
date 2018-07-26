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
// import 'vue-good-table/dist/vue-good-table.css'

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
      items: [],
      config: componentConfig
    }
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
    __delete (id) {
      this.$store.dispatch('get' + this.config.coreExtendVuex, id).then(() => {
        this.$store.dispatch('delete' + this.config.coreExtendVuex, this.$store.getters[this.config.coreExtendVuex])
      })
    }
  }
}
</script>

<template>
  <div>
    <div slot="header">
      <h2><slot>{{ config.displayName }}</slot></h2>
    </div>
    <a class="btn btn-primary" @click="__newItem()">New</a>
    <vue-good-table :columns="config.table.columns" :rows="itemsVuex" :lineNumbers="config.table.lineNumbers" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" styleClass="table table-bordered table-hover"></vue-good-table>
  </div>
</template>

<style lang="sass">
</style>
