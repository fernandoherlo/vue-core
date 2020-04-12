/*
|--------------------------------------------------------------------------
| Import core
|--------------------------------------------------------------------------
|
*/
import { EventBus } from '@/services/event-bus';

/*
|--------------------------------------------------------------------------
| CORE vuex actions
|--------------------------------------------------------------------------
|
*/
export default {
  core (config) { //mTypeNamePl, mTypeName, url, displayName
    var self = this
    return {
      ['getAll' + config.options.mTypeNamePl] ({ commit }) {
        return self.getBaseAll(commit, config.options)
      },
      ['getByParent' + config.options.mTypeNamePl] ({ commit }, id_parent) {
        return self.getByParent(commit, config, id_parent)
      },
      ['get' + config.options.mTypeName] ({ commit }, id) {
        return self.getItem(commit, config, id)
      },
      ['update' + config.options.mTypeName] ({ commit }, item) {
        return self.updateItem(commit, config, item)
      },
      ['save' + config.options.mTypeName] ({ commit }, item) {
        return self.saveItem(commit, config, item)
      },
      ['delete' + config.options.mTypeName] ({ commit }, item) {
        return self.deleteItem(commit, config, item)
      },
      ['deleteByParent' + config.options.mTypeName] ({ commit }, item_payload) {
        return self.deleteItem(commit, config, item_payload.item, item_payload.id_parent)
      },
      ['clear' + config.options.mTypeName] ({ commit }) {
        return self.clearItem(commit, config)
      }
    }
  },

  /*
  |--------------------------------------------------------------------------
  | GET ALL
  |--------------------------------------------------------------------------
  |
  */
  getBaseAll (commit, config) {
    // Degub
    EventBus.$log.debug('ACTIONS')
    return new Promise((resolve/*, reject*/) => {
      var _callback = items => {
        commit('RECEIVE_' +  config.options.mTypeNamePl, { items })
        commit('RECEIVE_LOAD_PARTIAL',  config.options.displayName)
        resolve()
      }
      EventBus.$emit('apiGet', config.options.url, _callback)
    })
  },
  /*
  |--------------------------------------------------------------------------
  | GET by PARENT
  |--------------------------------------------------------------------------
  |
  */
  getByParent (commit, config, id_parent) {
    // Degub
    EventBus.$log.debug('ACTIONS')
    return new Promise((resolve/*, reject*/) => {
      if (config.options.laravel) {
        let storeRelated = config.options.storeRelated
        let idRelated = config.options.idRelated
        commit('GET_BY_PARENT_LARAVEL_' + config.options.mTypeNamePl, { id_parent, storeRelated, idRelated })
      } else {
        commit('GET_BY_PARENT_' + config.options.mTypeNamePl, { id_parent })
      }
      resolve()
    })
  },
  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  |
  */
  getItem (commit, config, id) {
    // Degub
    EventBus.$log.debug('ACTIONS')
    return new Promise((resolve/*, reject*/) => {
      commit('GET_' + config.options.mTypeName, { id })
      resolve()
    })
  },
  /*
  |--------------------------------------------------------------------------
  | UPDATE
  |--------------------------------------------------------------------------
  |
  */
  updateItem (commit, config, item) {
    // Degub
    EventBus.$log.debug('ACTIONS')
    return new Promise((resolve/*, reject*/) => {
      var _callback = itemApi => {
        commit('UPDATE_' + config.options.mTypeName, { itemApi })
        resolve()
      }
      EventBus.$emit('apiUpdate', config.options.url, item, _callback)
    })
  },
  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  |
  */
  saveItem (commit, config, item) {
    // Degub
    EventBus.$log.debug('ACTIONS')
    return new Promise((resolve, reject) => {
      var _callback = itemApi => {
        if (itemApi) {
          commit('SAVE_' + config.options.mTypeName, { itemApi })
          // Param to callback
          resolve(itemApi)
        } else {
          reject(itemApi)
        }
      }
      EventBus.$emit('apiSave', config.options.url, item, _callback)
    })
  },
  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  |
  */
  deleteItem (commit, config, item, id_parent) {
    // Degub
    EventBus.$log.debug('ACTIONS')
    return new Promise((resolve/*, reject*/) => {
      // eslint-disable-next-line no-unused-vars
      var _callback = itemApi => {
        commit('DELETE_' + config.options.mTypeName, { item })
        resolve()
      }
      if (id_parent && config.options.laravel) {
        EventBus.$emit('apiDelete', config.options.url, item, _callback, null, id_parent)
      } else {
        EventBus.$emit('apiDelete', config.options.url, item, _callback)
      }
    })
  },
  /*
  |--------------------------------------------------------------------------
  | CLEAR
  |--------------------------------------------------------------------------
  |
  */
  clearItem (commit, config) {
    // Degub
    EventBus.$log.debug('ACTIONS')
    return new Promise((resolve/*, reject*/) => {
      commit('CLEAR_' + config.options.mTypeName)
      resolve()
    })
  },
}
