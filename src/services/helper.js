/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| $helper
|--------------------------------------------------------------------------
|
*/
let helper = new Vue({
  methods: {
    isNumber (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    getID (ID) {
      // Is number
      if (this.isNumber(ID)) {
        return parseInt(ID)
      } else {
        return ID
      }
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$helper = helper
  }
}
