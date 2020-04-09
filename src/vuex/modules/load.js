/*
|--------------------------------------------------------------------------
| Import core
|--------------------------------------------------------------------------
|
*/
import { EventBus } from '@/services/event-bus';

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
|
*/
const state = {
  load: false,
  msg: '',
  now: 0,
  count: 0
}

/*
|--------------------------------------------------------------------------
| Getters
|--------------------------------------------------------------------------
|
*/
const getters = {
  load: state => state.load,
  loadMsg: state => state.msg
}

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
|
*/
const actions = {
  // eslint-disable-next-line
  loadBaseData ({ dispatch, commit }, data) {
    // Degub
    EventBus.$log.debug('VUEX LOAD', data)

    var modules = data[0]
    var VUE_APP_LOAD_COMPLETE = data[1]

    // Init
    dispatch('initLoad', modules.length)
    // Load
    let load = function (i) {
      if (i === modules.length) {
        // Complete
        dispatch('completeLoad', VUE_APP_LOAD_COMPLETE)
      } else {
        dispatch(modules[i]).then(() => {
          // Next
          i++
          load(i)
        })
      }
    }
    // Init
    let i = 0
    load(i)
  },
  initLoad ({ commit }, count) {
    // Degub
    EventBus.$log.debug('RECEIVE_LOAD_INIT', count)
    commit('RECEIVE_LOAD_INIT', count)
  },
  completeLoad ({ commit }, VUE_APP_LOAD_COMPLETE) {
    // Degub
    EventBus.$log.debug('VUE_APP_LOAD_COMPLETE')
    setTimeout(() => {
      commit('RECEIVE_LOAD_END', '<strong>' + VUE_APP_LOAD_COMPLETE + '</strong>')
    }, 500)
    setTimeout(() => {
      commit('RECEIVE_LOAD')
    }, 1500)
  }
}

/*
|--------------------------------------------------------------------------
| Mutations
|--------------------------------------------------------------------------
|
*/
const mutations = {
  ['RECEIVE_LOAD'] (state) {
    // Degub
    EventBus.$log.debug('mu -> RECEIVE_LOAD')
    state.load = true
  },
  ['RECEIVE_LOAD_INIT'] (state, count) {
    // Degub
    EventBus.$log.debug('mu -> RECEIVE_LOAD_INIT', count)
    state.count = count
  },
  ['RECEIVE_LOAD_PARTIAL'] (state, msg) {
    // Degub
    EventBus.$log.debug('mu -> RECEIVE_LOAD_PARTIAL', msg)
    state.now++
    state.msg += '<small>' + msg + ' <strong>(' + state.now + '/' + state.count + ')</strong></small>'
  },
  ['RECEIVE_LOAD_END'] (state, msg) {
    // Degub
    EventBus.$log.debug('mu -> RECEIVE_LOAD_END', msg)
    state.msg += '<small class="end">' + msg + '</small>'
  }
}

/*
|--------------------------------------------------------------------------
| load.js
|--------------------------------------------------------------------------
|
*/
export default {
  state,
  getters,
  actions,
  mutations
}
