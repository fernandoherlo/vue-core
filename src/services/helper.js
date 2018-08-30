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
    // decimal
    toDecimal (n) {
      if (n === undefined || n === null) return '';
      return parseFloat(Math.round(n * 100) / 100).toFixed(2);
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
    },
    print () {
      window.print()
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$helper = helper
  }
}
