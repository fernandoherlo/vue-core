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
  coreExtendVuex: config.VUEX_MUTATION,
  coreExtendVuexPl: config.VUEX_MUTATION_PL,
  coreExtendScope: config.SCOPE,
  coreExtendScopePl: config.SCOPE_PL,
  coreExtendMenu: config.MENU,
  displayName: config.NAME,
  
  // Name bottoms
  buttonNewName: 'New',
  buttonEditName: 'Edit',
  buttonDeleteName: 'Delete',
  buttonAskDeleteName: 'Sure ?',
  buttonCancelName: 'Cancel',
  buttonBackName: 'Back',
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
      enabled: true,
      placeholder: 'Search'
    }
  },
  // Fields
  fields: config.FIELDS
}
