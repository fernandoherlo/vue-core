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
      ['UPDATE_' + options.mTypeName] (state, { status, item }) {
        self.updateItem(state, status, item)
      },
      ['SAVE_' + options.mTypeName] (state, { statusId, item }) {
        self.saveItem(state, statusId, item)
      },
      ['DELETE_' + options.mTypeName] (state, { status, item }) {
        self.deleteItem(state, status, item)
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
  updateItem (state, status, item) {
    if (status) {
      var index = state.all.indexOf(state.item)
      var clone = Object.assign({}, item)
      // Remove password from obejct - security
      delete clone.password;
      // ---
      // state.all[index] = clone
      // --- TODO: lo ideal seria con el codigo de arriba, pero la vue-table no coge reactivity
      state.all.splice(index, 1)
      state.all.push(clone)
      if (state.allByParent) {
        state.allByParent.splice(index, 1)
        state.allByParent.push(clone)
      }
    }
  },
  saveItem (state, statusId, item) {
    if (statusId) {
      // Set id
      item.id = statusId
      var clone = Object.assign({}, item)
      // ---
      // state.all[index] = clone
      // --- TODO: lo ideal seria con el codigo de arriba, pero la vue-table no coge reactivity
      state.all.push(clone)
      if (state.allByParent) {
        state.allByParent.push(clone)
      }
    }
  },
  deleteItem (state, status, item) {
    if (status) {
      var index = state.all.indexOf(item)
      state.all.splice(index, 1)
      if (state.allByParent) {
        index = state.allByParent.indexOf(item)
        state.allByParent.splice(index, 1)
      }
    }
  }
}
