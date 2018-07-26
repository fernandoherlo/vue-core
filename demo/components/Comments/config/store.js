import coreGetters from '@/vuex/getters'
import coreActions from '@/vuex/actions'
import coreMutations from '@/vuex/mutations'

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
import config from './_constants'

const options = {
  displayName: config.SCOPE_PL,
  url: process.env.VUE_APP_API_URL +  '/' + config.SCOPE_PL,
  mTypeName: config.VUEX_MUTATION,
  mTypeNamePl: config.VUEX_MUTATION_PL
}

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
|
*/
const state = {
  all: [],
  item: {}
}

/*
|--------------------------------------------------------------------------
| Getters
|--------------------------------------------------------------------------
|
*/
const getters = coreGetters.core(state, options)

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
|
*/
const actions = coreActions.core(options)

/*
|--------------------------------------------------------------------------
| Mutations
|--------------------------------------------------------------------------
|
*/
const mutations = coreMutations.core(state, options)

/*
|--------------------------------------------------------------------------
| Store
|--------------------------------------------------------------------------
|
*/
export default {
  state,
  getters,
  actions,
  mutations
}
