angular.module('app')

  .service('AuthTool', function ($window) {
    var self = this;

    self.saveToken = function (token) {
      $window.localStorage["jwttoken"] = token;
    };

    self.getToken = function () {
      return $window.localStorage["jwttoken"];
    };

    self.deleteToken = function () {
      return $window.localStorage.removeItem('jwttoken');
    }
  })

  .service('AuthService', function ($window, $q, $http, API_ENDPOINT, AuthTool, Session) {
    var self = this;

    self.register = function (user) {
      return $http.post(API_ENDPOINT.url + '/signup', user);
    };

    self.login = function (user) {
      return $http
        .post(API_ENDPOINT.url + '/authenticate', user)
        .then(function (res) {
          Session.create(res.data);
          return res.data
        });
    };

    self.getUserInformation = function() {
      return $http.get(API_ENDPOINT.url + '/memberInfo').then(function (data) {
        return data.data.user;
      });
    };

    self.logout = function () {
      return Session.destroy();
    };

    self.parseJwt = function (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    };

    self.isAuthed = function () {
      var token = AuthTool.getToken();

      return token;
    };

    self.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (self.isAuthed() && authorizedRoles.indexOf(Session.userRole) !== -1);
    };

  });
