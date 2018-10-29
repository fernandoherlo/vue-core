/*
|--------------------------------------------------------------------------
| Import core
|--------------------------------------------------------------------------
|
*/
import { EventBus } from '@/services/event-bus';

/*
|--------------------------------------------------------------------------
| CORE vuex mutations
|--------------------------------------------------------------------------
|
*/
export default {
  core (state, options) { // mTypeNamePl, mTypeName
    var self = this
    return {
      ['RECEIVE_' + options.mTypeNamePl] (state, { items }) {
        self.getAll(state, items)
      },
      ['GET_BY_PARENT_' + options.mTypeNamePl] (state, { id_parent }) {
        self.getAllByParent(state, id_parent)
      },
      ['GET_' + options.mTypeName] (state, { id }) {
        self.getItem(state, id)
      },
      ['UPDATE_' + options.mTypeName] (state, { itemApi }) {
        self.updateItem(state, itemApi)
      },
      ['SAVE_' + options.mTypeName] (state, { itemApi }) {
        self.saveItem(state, itemApi)
      },
      ['DELETE_' + options.mTypeName] (state, { item }) {
        self.deleteItem(state, item)
      },
      ['CLEAR_' + options.mTypeName] (state) {
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
    state.allByParent = state.all.filter(item => item.id_parent === id_parent)
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
