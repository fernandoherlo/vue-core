/*
|--------------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------------
|
*/
export default {
// VUEX
  VUEX_MUTATION: 'RELATION',
  VUEX_MUTATION_PL: 'RELATIONS',
  VUEX_MUTATION_ASSOCIATE: {
    STORE: 'POST',
    ID: 'id_relation',
    ADD: 'relations',
    REMOVE: 'post',
  },
  VUEX_MUTATION_GET_1: 'POSTS',
  // API
  SCOPE: 'relation',
  SCOPE_PL: 'relations',
  SCOPE_PARENT: 'user',
  // UI
  BACK_ONSAVE: true,
  BACK_ONUPDATE: true,
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
      label: 'Post',
      field: 'post.name',
      type: 'string',
      thClass: 'relation',
      tdClass: 'relation'
    }
  ],
  FIELDS: [
    {
      label: 'Relation',
      labelDefault: 'Select',
      field: 'id_relation',
      type: 'number',
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
  NAME: 'Relations'
}
