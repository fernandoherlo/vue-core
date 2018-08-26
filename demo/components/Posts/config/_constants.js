/*
|--------------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------------
|
*/
export default {
// VUEX
  VUEX_MUTATION: 'POST',
  VUEX_MUTATION_PL: 'POSTS',
  VUEX_MUTATION_ASSOCIATE: {
    STORE: 'RELATION',
    DELETE: 'relations'
  },
  // API
  SCOPE: 'post',
  SCOPE_PL: 'posts',
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
  ],
  FIELDS: [
    {
      label: 'Name',
      field: 'name',
      type: 'string',
      required: true,
      firstFocusForm: true
    },
  ],
  // EXTRAS
  MENU: '',
  NAME: 'Posts'
}
