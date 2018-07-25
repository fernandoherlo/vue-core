/*
|--------------------------------------------------------------------------
| $api
|--------------------------------------------------------------------------
|
*/
export default class ApiService {

  constructor ($http) {
    this.$http = $http
  }

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
    }, function (response) {
      // Fail
      console.log(response)
    })
  }

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
      _callback(true)
      console.log(response)
      // -----
    }, function (response) {
      // Fail
      console.log(response)
    })
  }

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
    }, function (response) {
      // Fail
      console.log(response)
    })
  }

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
      _callback(true)
      console.log(response)
    }, function (response) {
      // Fail
      console.log(response)
    })
  }
}
