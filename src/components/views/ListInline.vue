<script>
/*
|--------------------------------------------------------------------------
| CORE component & config
|--------------------------------------------------------------------------
|
*/
import CoreComponent from '@/components/views/Core'

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
  props: ['config'],
  data () {
    return {
      itemIDParent: 0,
      items: [],
      confirm: {},
      canEdit: false,
      canAssign: true,
      canCreateNew: false,
      canDelete: false
    }
  },
  created () {
    // Degub
    this.$log.debug('LISTINLINE')
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
        this.$acl.can(this.config.options.name, 'Update').then(() => {
          this.canEdit = true
        }).catch(() => {
          this.$log.warn('Edit')
        })
      }
      // Search Options
      if (this.config.table.searchOptions.enabled) {
        if (this.$refs.VueGoodTable.$children[0].$el) {
          this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].focus()
          this.$refs.VueGoodTable.$children[0].$el.getElementsByTagName('input')[0].select()
        }
      }
    })
    // Data
    this.itemIDParent = this.$helper.getID(this.$route.params.id)
    this.$store.dispatch('getByParent' + this.config.options.name, this.itemIDParent)
    // Created children
    this.__created()
  },
  computed: {
    itemsVuex () {
      return this.$store.getters['allByParent' + this.config.options.name]
    }
  },
  methods: {
    __created () {
      // Degub
      this.$log.debug('LIST')
    },
    __newItem () {
      // Degub
      this.$log.debug('LISTINLINE')
      this.$router.push({name: this.config.options.nameSingle + '-new', params: { id_parent: this.itemIDParent }})
    },
    __assign () {
      // Degub
      this.$log.debug('LISTINLINE')
      this.$router.push({name: this.config.options.nameSingle + '-assign', params: { id_parent: this.itemIDParent }})
    },
    __edit (id) {
      // Degub
      this.$log.debug('LISTINLINE')
      this.$router.push({name: this.config.options.nameSingle, params: { id: id, id_parent: this.itemIDParent }})
    },
    __confirmDelete (id) {
      // Degub
      this.$log.debug('LISTINLINE')
      // Reset
      this.confirm = {}
      // Delete
      this.$store.dispatch('get' + this.config.options.nameSingle, id).then(() => {
        let item_payload = {
          item: this.$store.getters[this.config.options.nameSingle],
          id_parent: this.itemIDParent
        }
        this.$store.dispatch('deleteByParent' + this.config.options.nameSingle, item_payload).then(() => {
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
      this.$log.debug('LISTINLINE')
      // Confirm false
      this.$set(this.confirm, id, false)
    },
    __delete (id) {
      // Degub
      this.$log.debug('LISTINLINE')
      // Reset
      this.confirm = {}
      // Confirm
      this.$set(this.confirm, id, true)
    },
    __checkComponentExists (name) {
      // Degub
      this.$log.debug('LISTINLINE')
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
    }
  }
}
</script>

<template>
  <div class="List Inline" :class="config.options.name">
    <div class="header">
      <h3 class="hidden-print">{{ config.options.displayName }}</h3>
      <h3 class="only-print">{{ config.options.displayNamePrint }}</h3>
    </div>
    <div class="actions">
      <template v-if="__checkComponentExists(config.options.name + '-btns')">
        <div :is="config.options.name + '-btns'" ref="btnsinline"></div>
      </template>
    </div>
    <vue-good-table ref="VueGoodTableInline" :columns="config.table.columns" :rows="itemsVuex" v-if="itemsVuex && itemsVuex.length" :lineNumbers="config.table.lineNumbers" @on-selected-rows-change="__selectionChanged" :select-options="config.table.selectOptions" :sort-options="config.table.sortOptions" :search-options="config.table.searchOptions" :pagination-options="config.table.paginationOptions" styleClass="table table-bordered table-hover">
      <div slot="selected-row-actions">
        <template v-if="__checkComponentExists(config.options.name + '-row-actions')">
          <div :is="config.options.name + '-row-actions'" ref="rowactionsinline"></div>
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
              <icon name="minus-circle" v-else></icon>
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
        </span>
        <span v-else v-html="props.formattedRow[props.column.field]">
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <div class="actions">
      <a class="btn new" @click="__newItem()" v-if="canCreateNew">
        <span v-html="config.buttons.newName" :title="config.buttons.newName" v-if="config.buttons.newName"></span>
        <icon name="plus-circle" v-else></icon>
      </a>
      <a class="btn assign" @click="__assign()" v-if="canAssign">
        <span v-html="config.buttons.assignName" :title="config.buttons.assignName" v-if="config.buttons.assignName"></span>
        <icon name="plus-circle" v-else></icon>
      </a>
    </div>
  </div>
</template>
<style lang="scss">
</style>
