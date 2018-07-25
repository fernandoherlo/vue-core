/*
|--------------------------------------------------------------------------
| CORE vuex getters
|--------------------------------------------------------------------------
|
*/
export default {
  core (state, options) { // mTypeNamePl, mTypeName
    return {
      ['all' + options.mTypeNamePl]: state => state.all,
      [options.mTypeName]: state => state.item,
      ['clone' + options.mTypeName]: state => Object.assign({}, state.item) //$.extend(true, {}, state.item)
    }
  }
}
