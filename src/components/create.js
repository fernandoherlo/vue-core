/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
*/
// import { VuexGetters } from '@fernandoherlo/vue-core-store'
// import { VuexActions } from '@fernandoherlo/vue-core-store'
// import { VuexMutations } from '@fernandoherlo/vue-core-store'

import { globalButtonsName } from '@/config/button'
import { globalTableConfig } from '@/config/table'
import { globalTableColumns } from '@/config/table'

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/
export const createPlugin = function (options, table, form, buttons, menu_links, routes, VuexGetters, VuexActions, VuexMutations)
{
  let config = {
    'options': options,
    'table': Object.assign({},
      globalTableConfig,
      {
        columns: table.columns.concat([globalTableColumns])
      },
      table.options
    ),
    'form': form,
    'buttons': Object.assign({},
      globalButtonsName,
      buttons
    ),
    'menu_links': menu_links,
    'routes': routes
  }

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
