export default {
  coreExtendVuex: 'COMMENT',
  coreExtendVuexPl: 'COMMENTS',
  coreExtendScope: 'comment',
  coreExtendScopePl: 'comments',
  coreExtendMenu: '',
  displayName: 'Comments',
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
