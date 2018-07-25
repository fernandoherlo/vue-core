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
      }
    }
  },

  // GET ALL
  getBaseAll (commit, options) {
    return new Promise((resolve/*, reject*/) => {
      var _callback = items => {
        commit('RECEIVE_' +  options.mTypeNamePl, { items })
        commit('RECEIVE_LOAD_PARTIAL',  options.displayName)
        resolve()
        console.log('LOAD')
      }
      EventBus.$emit('apiGet', options.url, _callback)
    })
  },
  // GET ITEM
  getItem (commit, options, id) {
    return new Promise((resolve/*, reject*/) => {
      commit('GET_' + options.mTypeName, { id })
      resolve()
    })
  },
  // UPDATE ITEM
  updateItem (commit, options, item) {
    return new Promise((resolve/*, reject*/) => {
      var _callback = status => {
        commit('UPDATE_' + options.mTypeName, { status, item })
        resolve()
      }
      EventBus.$emit('apiUpdate', options.url, item, _callback)
    })
  },
  // SAVE ITEM
  saveItem (commit, options, item) {
    return new Promise((resolve/*, reject*/) => {
      var _callback = statusId => {
        commit('SAVE_' + options.mTypeName, { statusId, item })
        resolve()
      }
      EventBus.$emit('apiSave', options.url, item, _callback)
    })
  },
  // DELETE ITEM
  deleteItem (commit, options, item) {
    return new Promise((resolve/*, reject*/) => {
      var _callback = status => {
        commit('DELETE_' + options.mTypeName, { status, item })
        resolve()
      }
      EventBus.$emit('apiDelete', options.url, item, _callback)
    })
  }
}
