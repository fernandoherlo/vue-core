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
      ['ADD_' + options.mTypeName] (state, { itemApi, param, idParam }) {
        self.addItem(state, itemApi, param, idParam)
      },
      ['REMOVE_' + options.mTypeName] (state, { item, param, idParam }) {
        self.removeItem(state, item, param, idParam)
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
    state.all = items
  },
  getAllByParent (state, id_parent) {
    state.allByParent = state.all.filter(item => item.id_parent === id_parent)
  },
  getItem (state, id) {
    state.item = state.all.filter(item => item.id === id)[0]
  },
  clearItem (state) {
    state.item = null
  },
  /*
  |--------------------------------------------------------------------------
  | UPDATE
  |--------------------------------------------------------------------------
  |
  */
  updateItem (state, item) {
    // Update all
    this.__updateItemState(state.all, item)
    if (state.allByParent) {
      // Update allByParent
      this.__updateItemState(state.allByParent, item)
    }
  },
  __updateItemState (stateEl, item, indexEl) {
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
    // Save all
    this.__saveItemState(state.all, item)
    if (state.allByParent) {
      // Save allByParent
      this.__saveItemState(state.allByParent, item)
    }
  },
  __saveItemState (stateEl, item) {
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
    // Delete
    this.__deleteItemState(state.all, item)
    if (state.allByParent) {
      // Delete
      this.__deleteItemState(state.allByParent, item)
    }
  },
  __deleteItemState (stateEl, item, indexEl) {
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
  },
  /*
  |--------------------------------------------------------------------------
  | ADD
  |--------------------------------------------------------------------------
  |
  */
  addItem (state, item, param, idParam) {
    // Add
    this.__addItemState(state.all, item, param, idParam)
    if (state.allByParent) {
      // Add
      this.__addItemState(state.allByParent, item, param, idParam)
    }
  },
  __addItemState (stateEl, item, param, idParam) {
    // Find index
    var index = stateEl.findIndex(function(element) {
      return element.id === item[idParam]
    })
    // Find item
    var itemRelated = stateEl[index]
    // Add item in property
    itemRelated[param] = this.__saveItemState (itemRelated[param], item)
    // Update
    this.__updateItemState(stateEl, itemRelated, index)
  },
  /*
  |--------------------------------------------------------------------------
  | REMOVE
  |--------------------------------------------------------------------------
  |
  */
  removeItem (state, item, param, idParam) {
    // Remove
    this.__removeItemState(state.all, item, param, idParam)
    if (state.allByParent) {
      // Remove
      this.__removeItemState(state.allByParent, item, param, idParam)
    }
  },
  __removeItemState (stateEl, item, param, idParam) {
    // Find index
    var index = stateEl.findIndex(function(element) {
      return element.id === item[idParam]
    })
    // Find item
    var itemRelated = stateEl[index]
    // Find index related
    var indexRelated = itemRelated[param].findIndex(function(element) {
      return element.id === item.id
    })
    // Delete item in property
    itemRelated[param] = this.__deleteItemState(itemRelated[param], itemRelated, indexRelated)
    // Update
    this.__updateItemState(stateEl, itemRelated, index)
  }
}
