/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| methodsHelper
|--------------------------------------------------------------------------
|
*/
let methodsHelper = {
  // Number
  isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  // decimal
  toDecimal (n) {
    if (n === undefined || n === null) return '';
    return parseFloat(Math.round(n * 100) / 100).toFixed(2);
  },
  toCurrency (number) {
    /*
     * @param integer n: length of decimal
     * @param integer x: length of whole part
     * @param mixed   s: sections delimiter
     * @param mixed   c: decimal delimiter
     * @param mixed   y: symbol currency
     */
    const n = 2
    const x = 3
    const s = '.'
    const c = ','
    const y = '€'
    if (!number) {
      number = 0
    } 
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')'
    var num = number.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')) + y;
  },
  toTimeFromMs (millisec) {
    var seconds = (millisec / 1000).toFixed(1)
    var minutes = (millisec / (1000 * 60)).toFixed(1)
    var hours = (millisec / (1000 * 60 * 60)).toFixed(1)
    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1)

    if (seconds < 60) {
      return seconds + '"'
    } else if (minutes < 60) {
      return minutes + "'"
    } else if (hours < 24) {
      return hours + "h"
    } else {
      return days + "d"
    }
  },
  toHmsFromMs (duration) {
    // var milliseconds = parseInt((duration % 1000) / 100)
    var seconds = Math.floor((duration / 1000) % 60)
    var minutes = Math.floor((duration / (1000 * 60)) % 60)
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + 'h ' + minutes + '\' ' + seconds + '"'
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
  // Parse CONFIG DB
  getValueNameConfig (arrayConfig, id) {
    if (arrayConfig) {
      const result = arrayConfig.filter(config => config.id === id)
      if (result.length > 0) {
        return result[0].value_data
      } else {
        return ''
      }
    } else {
      return ''
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

/*
|--------------------------------------------------------------------------
| $helper
|--------------------------------------------------------------------------
|
*/
let helper = new Vue({
  methods: methodsHelper
})

export default {
  install: function(Vue) {
    Vue.prototype.$helper = helper
  },
  $: methodsHelper
}
