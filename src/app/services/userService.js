angular.module('app')

  .service('userService', function ($q, $http, AuthTool, API_ENDPOINT) {
    var self = this;
    var user;

    self.getUser = function () {
      if (user) {
        return $q.resolve(user);
      }
      else {
        if (AuthTool.getToken()) {
          return $http.get(API_ENDPOINT.url + '/memberInfo').then(function (data) {
            user = data.data.user;
            return data.data.user;
          });
        }
        else {
          return $q.resolve(user);
        }
      }
    };

    self.deleteUser = function() {
      user = null;
    };

  });
