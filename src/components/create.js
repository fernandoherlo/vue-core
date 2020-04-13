/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
import VuexGetters from '@/vuex/getters'
import VuexActions from '@/vuex/actions'
import VuexMutations from '@/vuex/mutations'

import { buttonsName } from '@/config/button'
import { globalTableConfig } from '@/config/table'
import { baseTableColumns } from '@/config/table'

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/
export const createPlugin = function (config)
{
  config = Object.assign({
      // Name bottoms
      buttons: Object.assign({},
        buttonsName,
        config.buttons
      ),
      // Table
      table: Object.assign({},
        globalTableConfig,
        {
          columns: config.table.columns.concat([baseTableColumns])
        },
        config.table.options
      )
    },
    config
  )

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  |
  */
  const state = {
    all: [],
    item: {},
    clone: {}
  }

  /*
  |--------------------------------------------------------------------------
  | Getters
  |--------------------------------------------------------------------------
  |
  */
  const getters = VuexGetters.core(state, config)

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  |
  */
  const actions = VuexActions.core(config)

  /*
  |--------------------------------------------------------------------------
  | Mutations
  |--------------------------------------------------------------------------
  |
  */
  const mutations = VuexMutations.core(state, config)

  /*
  |--------------------------------------------------------------------------
  | Store
  |--------------------------------------------------------------------------
  |
  */
  let store = {
    state,
    getters,
    actions,
    mutations
  }

  return [config, store]
}
