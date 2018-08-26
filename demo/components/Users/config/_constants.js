/*
|--------------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------------
|
*/
export default {
// VUEX
  VUEX_MUTATION: 'USER',
  VUEX_MUTATION_PL: 'USERS',
  // API
  SCOPE: 'user',
  SCOPE_PL: 'users',
  // TABLE
  TABLE_COLUMNS: [
    {
      label: 'ID',
      field: 'id',
      type: 'string',
      thClass: 'id',
      tdClass: 'id',
      sortable: false
    },
    {
      label: 'Email',
      field: 'email',
      type: 'string',
      thClass: 'email',
      tdClass: 'email'
    },
    {
      label: 'Role',
      field: 'role',
      type: 'string',
      thClass: 'role',
      tdClass: 'role'
    },
  ],
  FIELDS: [
    {
      label: 'Email',
      field: 'email',
      type: 'string',
      required: true
    },
    {
      label: 'Password',
      field: 'password',
      type: 'string',
      required: true
    },
    {
      label: 'Role',
      labelDefault: 'Select',
      field: 'role',
      type: 'string',
      required: true
    },
  ],
  // EXTRAS
  MENU: '',
  NAME: 'Users'
}
