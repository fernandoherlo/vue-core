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
    // Number
    isNumber (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    // Parse ID
    getID (ID) {
      // Is number
      if (this.isNumber(ID)) {
        return parseInt(ID)
      } else {
        return ID
      }
    },
    // Search
    pregQuote ( str ) {
      // eslint-disable-next-line
      return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
    },
    search ( haystack, needle ) {
      return haystack.toString().replace(
        new RegExp('(' + this.pregQuote(needle) + ')', 'ig'),
        '<span class="highlight">$1</span>'
      )
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$helper = helper
  }
}
