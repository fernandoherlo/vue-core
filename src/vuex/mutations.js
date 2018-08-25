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
      }
    }
  },

  getAll (state, items) {
    state.all = items
  },
  getAllByParent (state, id_parent) {
    state.allByParent = state.all.filter(item => item.id_parent === id_parent)
  },
  getItem (state, id) {
    state.item = state.all.filter(item => item.id === id)[0]
  },
  updateItem (state, item) {
    var index = state.all.indexOf(state.item)
    var clone = Object.assign({}, item)
    state.all.splice(index, 1)
    state.all.push(clone)
    if (state.allByParent) {
      state.allByParent.splice(index, 1)
      state.allByParent.push(clone)
    }
  },
  saveItem (state, item) {
    var clone = Object.assign({}, item)
    state.all.push(clone)
    if (state.allByParent) {
      state.allByParent.push(clone)
    }
  },
  deleteItem (state, item) {
    var index = state.all.indexOf(item)
    state.all.splice(index, 1)
    if (state.allByParent) {
      index = state.allByParent.indexOf(item)
      state.allByParent.splice(index, 1)
    }
  }
}
