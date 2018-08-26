/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
import config from './_constants'

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/

let baseColumns = [{
  label: 'Actions',
  field: 'id',
  type: 'number',
  thClass: 'actions',
  tdClass: 'actions',
  sortable: false
}]

export default {
  inline: true,
  coreExtendVuex: config.VUEX_MUTATION,
  coreExtendVuexPl: config.VUEX_MUTATION_PL,
  coreExtendVuexGet1: config.VUEX_MUTATION_GET_1,
  coreExtendScope: config.SCOPE,
  coreExtendScopePl: config.SCOPE_PL,
  coreExtendScopeParent: config.SCOPE_PARENT,
  backOnSave: config.BACK_ONSAVE,
  backOnUpdate: config.BACK_ONUPDATE,
  coreExtendMenu: config.MENU,
  displayName: config.NAME,
  
  // Name bottoms
  buttonNewName: 'New Inline',
  buttonEditName: 'Edit',
  buttonDeleteName: 'Delete',
  buttonAskDeleteName: 'Sure ?',
  buttonCancelName: 'Cancel',
  buttonBackName: '« Back',
  buttonSaveName: 'Save',
  buttonUpdateName: 'Update',
  // Table
  table: {
    columns: config.TABLE_COLUMNS.concat(baseColumns),
    lineNumbers: true,
    sortOptions: {
      enabled: true
      // initialSortBy: {
      //   field: 'name',
      //   type: 'asc'
      // }
    },
    searchOptions: {
      enabled: false
    }
  },
  // Fields
  fields: config.FIELDS
}
