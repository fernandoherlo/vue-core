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
export const initComponent = function (component)
{
  let componentObject = {
    inline: component.componentInline,
    coreExtendVuex: component.componentName,
    coreExtendVuexPl: component.componentNamePl,
    coreExtendScope: component.componentName,
    coreExtendScopePl: component.componentNamePl,
    coreExtendScopeParent: component.componentParent,
    coreVuexAssociate: component.componentVuexAssociate,
    formName: component.componentNamePl,
    displayName: component.displayName,
    displayNamePrint: component.displayNamePrint,
    typeMenu: component.typeMenu,

    backOnSave: component.backOnSave,
    backOnUpdate: component.backOnUpdate,
    
    // Name bottoms
    buttons: Object.assign({},
      buttonsName
    ),
    // Table
    table: Object.assign({},
      globalTableConfig,
      {
        columns: component.columnsTable.concat([baseTableColumns])
      },
      component.optionsTable
    ),
    // Fields
    fields: component.fieldsForm,
    fieldID: component.fieldID
  }

  /*
  |--------------------------------------------------------------------------
  | Store
  |--------------------------------------------------------------------------
  |
  */
  let options = {
    displayName: component.displayName,
    url: component.componentUrl +  '/' + component.componentNamePl,
    mTypeName: component.componentName,
    mTypeNamePl: component.componentNamePl
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
  const getters = VuexGetters.core(state, options)

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  |
  */
  const actions = VuexActions.core(options)

  /*
  |--------------------------------------------------------------------------
  | Mutations
  |--------------------------------------------------------------------------
  |
  */
  const mutations = VuexMutations.core(state, options)

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

  return [componentObject, store]
}
