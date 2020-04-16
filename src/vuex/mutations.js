/*
|--------------------------------------------------------------------------
| Import core
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'
import { EventBus } from '@/services/event-bus';

/*
|--------------------------------------------------------------------------
| CORE vuex mutations
|--------------------------------------------------------------------------
|
*/
export default {
  core (state, config) { // mTypeNamePl, mTypeName
    var self = this
    return {
      ['RECEIVE_' + config.options.name] (state, { items }) {
        self.getAll(state, items)
      },
      ['GET_BY_PARENT_' + config.options.name] (state, { id_parent }) {
        self.getAllByParent(state, id_parent)
      },
      ['GET_BY_PARENT_LARAVEL_' + config.options.name] (state, { id_parent, dataRelatedLaravel, dataIdRelated }) {
        self.getAllByParentLaravel(state, id_parent, dataRelatedLaravel, dataIdRelated)
      },
      ['GET_' + config.options.nameSingle] (state, { id }) {
        self.getItem(state, id)
      },
      ['UPDATE_' + config.options.nameSingle] (state, { itemApi }) {
        self.updateItem(state, itemApi)
      },
      ['SAVE_' + config.options.nameSingle] (state, { itemApi }) {
        self.saveItem(state, itemApi)
      },
      ['DELETE_' + config.options.nameSingle] (state, { item }) {
        self.deleteItem(state, item)
      },
      ['CLEAR_' + config.options.nameSingle] (state) {
        self.clearItem(state)
      }
    }
  },

  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  |
  */
  getAll (state, items) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    state.all = items
  },
  getAllByParent (state, id_parent) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    let newStates = state.all.filter(item => item.id_parent === id_parent)

    Vue.set(state, 'allByParent', newStates)
  },
  getAllByParentLaravel (state, id_parent, dataRelatedLaravel, dataIdRelated) {
    // Degub
    EventBus.$log.debug('MUTATIONS')

    let newStates = null

    if (dataRelatedLaravel) { 
      newStates = state.all.filter( function(item) {
        let relateds = item[dataRelatedLaravel].filter( function(related) {
          return related.id === id_parent
        })
        return relateds.length > 0
      })
    }
    if (dataIdRelated) { 
      newStates = state.all.filter( function(item) {
        return item[dataIdRelated] === id_parent
      })
    }

    Vue.set(state, 'allByParent', newStates)
  },
  getItem (state, id) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    state.item = state.all.filter(item => item.id === id)[0]
    state.clone = Object.assign({}, state.item)
  },
  clearItem (state) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    state.item = {}
    state.clone = {}
  },
  /*
  |--------------------------------------------------------------------------
  | UPDATE
  |--------------------------------------------------------------------------
  |
  */
  updateItem (state, item) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    // Update all
    this.__updateItemState(state.all, item)
    if (state.allByParent) {
      // Update allByParent
      this.__updateItemState(state.allByParent, item)
    }
  },
  __updateItemState (stateEl, item, indexEl) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    var index = stateEl.findIndex(function(element) {
      return element.id === item.id;
    })
    // Overwrite
    if (indexEl){
      index = indexEl
    }
    var clone = Object.assign({}, item)
    stateEl.splice(index, 1)
    stateEl.push(clone)
  },
  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  |
  */
  saveItem (state, item) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    // Save all
    this.__saveItemState(state.all, item)
    if (state.allByParent) {
      // Save allByParent
      this.__saveItemState(state.allByParent, item)
    }
  },
  __saveItemState (stateEl, item) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    var clone = Object.assign({}, item)
    stateEl.push(clone)

    // Return
    return stateEl
  },
  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  |
  */
  deleteItem (state, item) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    // Delete
    this.__deleteItemState(state.all, item)
    if (state.allByParent) {
      // Delete
      this.__deleteItemState(state.allByParent, item)
    }
  },
  __deleteItemState (stateEl, item, indexEl) {
    // Degub
    EventBus.$log.debug('MUTATIONS')
    var index = stateEl.findIndex(function(element) {
      return element.id === item.id
    })
    // Overwrite
    if (indexEl){
      index = indexEl
    }
    stateEl.splice(index, 1)
    // Return
    return stateEl
  }
}
