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
  core (config) { //mTypeNamePl, mTypeName, dataUrl, displayName
    var self = this
    return {
      ['getAll' + config.options.name] ({ commit }) {
        return self.getBaseAll(commit, config)
      },
      ['getByParent' + config.options.name] ({ commit }, id_parent) {
        return self.getByParent(commit, config, id_parent)
      },
      ['get' + config.options.nameSingle] ({ commit }, id) {
        return self.getItem(commit, config, id)
      },
      ['update' + config.options.nameSingle] ({ commit }, item) {
        return self.updateItem(commit, config, item)
      },
      ['save' + config.options.nameSingle] ({ commit }, item) {
        return self.saveItem(commit, config, item)
      },
      ['delete' + config.options.nameSingle] ({ commit }, item) {
        return self.deleteItem(commit, config, item)
      },
      ['deleteByParent' + config.options.nameSingle] ({ commit }, item_payload) {
        return self.deleteItem(commit, config, item_payload.item, item_payload.id_parent)
      },
      ['clear' + config.options.nameSingle] ({ commit }) {
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
        commit('RECEIVE_' +  config.options.name, { items })
        commit('RECEIVE_LOAD_PARTIAL',  config.options.displayName)
        resolve()
      }
      EventBus.$emit('apiGet', config.options.dataUrl, _callback)
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
      if (config.options.dataFromLaravel) {
        let dataRelatedLaravel = config.options.dataRelatedLaravel
        let dataIdRelated = config.options.dataIdRelated
        commit('GET_BY_PARENT_LARAVEL_' + config.options.name, { id_parent, dataRelatedLaravel, dataIdRelated })
      } else {
        commit('GET_BY_PARENT_' + config.options.name, { id_parent })
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
      commit('GET_' + config.options.nameSingle, { id })
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
        commit('UPDATE_' + config.options.nameSingle, { itemApi })
        resolve()
      }
      EventBus.$emit('apiUpdate', config.options.dataUrl, item, _callback)
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
          commit('SAVE_' + config.options.nameSingle, { itemApi })
          // Param to callback
          resolve(itemApi)
        } else {
          reject(itemApi)
        }
      }
      EventBus.$emit('apiSave', config.options.dataUrl, item, _callback)
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
        commit('DELETE_' + config.options.nameSingle, { item })
        resolve()
      }
      if (id_parent && config.options.dataFromLaravel) {
        EventBus.$emit('apiDelete', config.options.dataUrl, item, _callback, null, id_parent)
      } else {
        EventBus.$emit('apiDelete', config.options.dataUrl, item, _callback)
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
      commit('CLEAR_' + config.options.nameSingle)
      resolve()
    })
  },
}
