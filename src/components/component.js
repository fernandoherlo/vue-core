/*
|--------------------------------------------------------------------------
| CONFIG component
|--------------------------------------------------------------------------
|
*/
export default {
  coreExtendVuex: 'ITEM',
  coreExtendVuexPl: 'ITEMS',
  coreExtendScope: 'item',
  coreExtendScopePl: 'items',
  displayName: 'Item',
  // Name bottoms
  buttonNewName: 'New',
  buttonEditName: 'Edit',
  buttonDeleteName: 'Delete',
  // Table
  table: {
    columns: [
      {
        label: 'ID',
        field: 'id',
        type: 'number',
        sortable: false
      },
      {
        label: 'Name',
        field: 'name',
        type: 'string'
      },
      {
        label: 'Actions',
        field: 'id',
        type: 'number',
        sortable: false
      }
    ],
    lineNumbers: true,
    sortOptions: {
      enabled: true,
      initialSortBy: {
        field: 'name',
        type: 'asc'
      }
    },
    searchOptions: {
      enabled: true
    }
  },
  // Delete make
  delete: {
    confirm: {
      title: 'Delete item',
      description: 'Are you sure you want to delete the item?',
      buttonActionText: 'Delete'
    }
  }
}
