/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| $api
|--------------------------------------------------------------------------
|
*/
let api = new Vue({
  methods: {
    // GET ALL
    // ******************
    get (url, _callback) {
      var options = {
        url: url,
        method: 'GET'
      }
      this.$http.axios(options).then(function (response) {
        // Return items
        _callback(response.data)
      }, function (/*err*/) {
        // Fail
      })
    },

    // UPDATE
    // ******************
    update (url, item, _callback) {
      // Data
      var data = {}
      // Fields
      for (var propertyName in item) {
        data[propertyName] = item[propertyName]
      }
      var options = {
        url: url + '/' + item.id,
        method: 'POST',
        data: data
      }
      this.$http.axios(options).then(function (response) {
        // CallBack
        _callback(response.data)
        // Notify
        this.$notify({
          group: 'global',
          title: 'Update',
          text: 'Hello user! This is a notification!'
        });
        // -----
      }, function (/*response*/) {
        // Fail
      })
    },

    // SAVE
    save (url, item, _callback) {
      // Data
      var data = {}
      // Fields
      for (var propertyName in item) {
        data[propertyName] = item[propertyName]
      }
      var options = {
        url: url,
        method: 'POST',
        data: data
      }
      this.$http.axios(options).then(function (response) {
        // CallBack
        _callback(response.data.id)
      }, function (/*response*/) {
        // Fail
      })
    },

    // DELETE
    delete (url, item, _callback, wait) {
      if (wait) {
        // Alert wait
      }
      var options = {
        url: url + '/' + item.id,
        method: 'DELETE'
      }
      this.$http.axios(options).then(function (response) {
        // CallBack
        _callback(response.data)
      }, function (/*response*/) {
        // Fail
      })
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$api = api
  }
}

