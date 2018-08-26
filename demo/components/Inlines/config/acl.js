/*
|--------------------------------------------------------------------------
| Acl
|--------------------------------------------------------------------------
|
*/

export default {
  admin: {
    Create: true,
    Read: true,
    Update: true,
    Delete: true
  },
  user: {
    Create: false,
    Read: true,
    Update: false,
    Delete: false
  }
}
