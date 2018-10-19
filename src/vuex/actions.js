/*
|--------------------------------------------------------------------------
| Import core
|--------------------------------------------------------------------------
|
*/
import { EventBus } from '@/services/event-bus.js';

/*
|--------------------------------------------------------------------------
| CORE vuex actions
|--------------------------------------------------------------------------
|
*/
export default {
  core (options) { //mTypeNamePl, mTypeName, url, displayName
    var self = this
    return {
      ['getAll' + options.mTypeNamePl] ({ commit }) {
        return self.getBaseAll(commit, options)
      },
      ['getByParent' + options.mTypeNamePl] ({ commit }, id_parent) {
        return self.getByParent(commit, options, id_parent)
      },
      ['get' + options.mTypeName] ({ commit }, id) {
        return self.getItem(commit, options, id)
      },
      ['update' + options.mTypeName] ({ commit }, item) {
        return self.updateItem(commit, options, item)
      },
      ['save' + options.mTypeName] ({ commit }, item) {
        return self.saveItem(commit, options, item)
      },
      ['delete' + options.mTypeName] ({ commit }, item) {
        return self.deleteItem(commit, options, item)
      },
      ['clear' + options.mTypeName] ({ commit }) {
        return self.clearItem(commit, options)
      }
    }
  },

  /*
  |--------------------------------------------------------------------------
  | GET ALL
  |--------------------------------------------------------------------------
  |
  */
  getBaseAll (commit, options) {
    return new Promise((resolve/*, reject*/) => {
      var _callback = items => {
        commit('RECEIVE_' +  options.mTypeNamePl, { items })
        commit('RECEIVE_LOAD_PARTIAL',  options.displayName)
        resolve()
      }
      EventBus.$emit('apiGet', options.url, _callback)
    })
  },
  /*
  |--------------------------------------------------------------------------
  | GET by PARENT
  |--------------------------------------------------------------------------
  |
  */
  getByParent (commit, options, id_parent) {
    return new Promise((resolve/*, reject*/) => {
      commit('GET_BY_PARENT_' + options.mTypeNamePl, { id_parent })
      resolve()
    })
  },
  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  |
  */
  getItem (commit, options, id) {
    return new Promise((resolve/*, reject*/) => {
      commit('GET_' + options.mTypeName, { id })
      resolve()
    })
  },
  /*
  |--------------------------------------------------------------------------
  | UPDATE
  |--------------------------------------------------------------------------
  |
  */
  updateItem (commit, options, item) {
    return new Promise((resolve/*, reject*/) => {
      var _callback = itemApi => {
        commit('UPDATE_' + options.mTypeName, { itemApi })
        resolve()
      }
      EventBus.$emit('apiUpdate', options.url, item, _callback)
    })
  },
  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  |
  */
  saveItem (commit, options, item) {
    return new Promise((resolve/*, reject*/) => {
      var _callback = itemApi => {
        commit('SAVE_' + options.mTypeName, { itemApi })
        // Param to callback
        resolve(itemApi)
      }
      EventBus.$emit('apiSave', options.url, item, _callback)
    })
  },
  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  |
  */
  deleteItem (commit, options, item) {
    return new Promise((resolve/*, reject*/) => {
      // eslint-disable-next-line no-unused-vars
      var _callback = itemApi => {
        commit('DELETE_' + options.mTypeName, { item })
        resolve()
      }
      EventBus.$emit('apiDelete', options.url, item, _callback)
    })
  },
  /*
  |--------------------------------------------------------------------------
  | CLEAR
  |--------------------------------------------------------------------------
  |
  */
  clearItem (commit, options) {
    return new Promise((resolve/*, reject*/) => {
      commit('CLEAR_' + options.mTypeName)
      resolve()
    })
  },
}
