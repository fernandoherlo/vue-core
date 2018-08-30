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
  loadBaseData ({ dispatch, commit }, modules, VUE_APP_LOAD_COMPLETE) {
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
    commit('RECEIVE_LOAD_INIT', count)
  },
  completeLoad ({ commit }, VUE_APP_LOAD_COMPLETE) {
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
    state.load = true
  },
  ['RECEIVE_LOAD_INIT'] (state, count) {
    state.count = count
  },
  ['RECEIVE_LOAD_PARTIAL'] (state, msg) {
    state.now++
    state.msg += '<small>' + msg + ' <strong>(' + state.now + '/' + state.count + ')</strong></small>'
  },
  ['RECEIVE_LOAD_END'] (state, msg) {
    state.msg += '<small>' + msg + ' <strong>(' + state.now + '/' + state.count + ')</strong></small>'
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
