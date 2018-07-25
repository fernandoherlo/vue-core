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
      ['GET_' + options.mTypeName] (state, { id }) {
        self.getItem(state, id)
      },
      // ['UPDATE_' + options.mTypeName] (state, { status, item }) {
      //   self.updateItem(state, status, item)
      // },
      // ['SAVE_' + options.mTypeName] (state, { statusId, item }) {
      //   self.saveItem(state, statusId, item)
      // },
      // ['DELETE_' + options.mTypeName] (state, { status, item }) {
      //   self.deleteItem(state, status, item)
      // }
    }
  },

  getAll (state, items) {
    state.all = items
  },
  getItem (state, id) {
    state.item = state.all.filter(item => item.id === id)[0]
  },
  // updateItem (state, status, item) {
  //   if (status) {
  //     var index = state.all.indexOf(state.item)
  //     var clone = utils.clone(item)
  //     // ---
  //     // state.all[index] = clone
  //     // --- TODO: lo ideal seria con el codigo de arriba, pero la vue-table no coge reactivity
  //     state.all.splice(index, 1)
  //     state.all.push(clone)
  //   }
  // },
  // saveItem (state, statusId, item) {
  //   if (statusId) {
  //     // Set id
  //     item.id = statusId
  //     var clone = utils.clone(item)
  //     // ---
  //     // state.all[index] = clone
  //     // --- TODO: lo ideal seria con el codigo de arriba, pero la vue-table no coge reactivity
  //     state.all.push(clone)
  //   }
  // },
  // deleteItem (state, status, item) {
  //   if (status) {
  //     var index = state.all.indexOf(item)
  //     state.all.splice(index, 1)
  //   }
  // }
}
