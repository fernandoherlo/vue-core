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
  // List makes
  list: {
    // Vue-table
    columns: ['id', 'name', 'actions'],
    options: {
      orderBy: {
        column: 'name',
        ascending: true
      },
      sortable: ['name'],
      compileTemplates: true,
      headings: {
        id: 'ID',
        name: 'Name',
        actions: 'Actions'
      }
      // templates: {
      //   actions: 'table-edit-delete-core'
      // }
    }
    // // Css
    // columnClassListOn: 'col-sm-7',
    // columnClassListOff: 'col-sm-12',
    // columnClassManageOn: 'col-sm-5',
    // columnClassManageOff: 'col-sm-0'
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
