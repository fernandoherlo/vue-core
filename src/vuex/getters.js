/*
|--------------------------------------------------------------------------
| CORE vuex getters
|--------------------------------------------------------------------------
|
*/
export default {
  core (state, config) { // mTypeNamePl, mTypeName
    return {
      ['all' + config.options.name]: state => state.all,
      ['allByParent' + config.options.name]: state => state.allByParent,
      [config.options.nameSingle]: state => state.item,
      ['clone' + config.options.nameSingle]: state => state.clone
    }
  }
}
