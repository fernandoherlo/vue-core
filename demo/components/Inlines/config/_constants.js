/*
|--------------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------------
|
*/
export default {
// VUEX
  VUEX_MUTATION: 'INLINE',
  VUEX_MUTATION_PL: 'INLINES',
  VUEX_MUTATION_ASSOCIATE: {
    STORE: 'COMMENT',
    ID: 'id_parent',
    ADD: 'inlines',
    REMOVE: 'comment',
  },
  // API
  SCOPE: 'inline',
  SCOPE_PL: 'inlines',
  SCOPE_PARENT: 'comment',
  // TABLE
  TABLE_COLUMNS: [
    {
      label: 'ID',
      field: 'id',
      type: 'number',
      thClass: 'id',
      tdClass: 'id',
      sortable: false
    },
    {
      label: 'Name',
      field: 'name',
      type: 'string',
      thClass: 'name',
      tdClass: 'name'
    },
    {
      label: 'Parent',
      field: 'comment.name',
      type: 'string',
      thClass: 'parent',
      tdClass: 'parent'
    },
  ],
  FIELDS: [
    {
      label: 'Name',
      field: 'name',
      type: 'string',
      required: true,
      firstFocusForm: true
    },
    {
      label: 'Parent',
      field: 'id_parent',
      type: 'number',
      required: true
    },
  ],
  // EXTRAS
  MENU: '',
  NAME: 'Inlines'
}
