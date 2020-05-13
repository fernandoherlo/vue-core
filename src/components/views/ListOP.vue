<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponentList from '@/components/views/List'
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
  extends: CoreComponentList,
  components: {
    VueGoodTable
  },
  data () {
    return {
      config: componentConfig,
    }
  },
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

    <vue-good-table ref="VueGoodTable" :columns="config.table.columns" :rows="itemsVuexPreFilter" v-if="itemsVuexPreFilter && itemsVuexPreFilter.length" :lineNumbers="config.table.lineNumbers" @on-selected-rows-change="__selectionChanged" :select-options="config.table.selectOptions" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" :pagination-options="config.table.paginationOptions" styleClass="table table-bordered table-hover" @on-per-page-change="__onPageChanged">
    </vue-good-table>
  </div>
</template>

<style lang="scss">
</style>
