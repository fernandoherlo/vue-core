/*
|--------------------------------------------------------------------------
| CONFIG component
|--------------------------------------------------------------------------
|
*/
export default {
  coreExtendVuex: 'COMMENT',
  coreExtendVuexPl: 'COMMENTS',
  coreExtendScope: 'comment',
  coreExtendScopePl: 'comments',
  coreExtendMenu: '',
  displayName: 'Comments',
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
        type: 'string',
        filterOptions: {
          enabled: true
        }
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
      title: 'Delete comment',
      description: 'Are you sure you want to delete the item?',
      buttonActionText: 'Delete'
    }
  }
}
