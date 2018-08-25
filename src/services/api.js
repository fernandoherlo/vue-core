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
      // var self = this
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
      var self = this
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
        self.$notify({
          group: 'global',
          type: 'success',
          title: 'Update',
          text: 'Update element successfull!'
        });
        // -----
      }, function (/*response*/) {
        // Fail
      })
    },

    // SAVE
    save (url, item, _callback) {
      var self = this
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
        _callback(response.data)
        // Notify
        self.$notify({
          group: 'global',
          type: 'success',
          title: 'Save',
          text: 'Save element successfull!'
        });
      }, function (/*response*/) {
        // Fail
      })
    },

    // DELETE
    delete (url, item, _callback, wait) {
      var self = this
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
        // Notify
        self.$notify({
          group: 'global',
          type: 'success',
          title: 'Delete',
          text: 'Delete element successfull!'
        });
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

