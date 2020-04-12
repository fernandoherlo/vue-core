/*
|--------------------------------------------------------------------------
| CORE vuex getters
|--------------------------------------------------------------------------
|
*/
export default {
  core (state, config) { // mTypeNamePl, mTypeName
    return {
      ['all' + config.options.mTypeNamePl]: state => state.all,
      ['allByParent' + config.options.mTypeNamePl]: state => state.allByParent,
      [config.options.mTypeName]: state => state.item,
      ['clone' + config.options.mTypeName]: state => state.clone
    }
  }
}
