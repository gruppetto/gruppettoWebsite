angular.module('app')

  .service('AuthTool', function ($window) {
    var self = this;

    self.saveToken = function (token) {
      $window.localStorage['jwtToken'] = token;
    };

    self.getToken = function () {
      return $window.localStorage['jwtToken'];
    };
  })

  .service('AuthService', function ($window, $q, $http, API_ENDPOINT, AuthTool) {
    var self = this;

    self.register = function (user) {
      return $http.post(API_ENDPOINT.url + '/signup', user);
    };

    self.login = function (user) {
      return $http.post(API_ENDPOINT.url + '/authenticate', user);
    };

    self.logout = function () {
      return $q.resolve($window.localStorage.removeItem('jwtToken'));
    };

    self.parseJwt = function (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    };

    self.isAuthed = function () {
      var token = AuthTool.getToken();

      return token ? true : false;
    };

  })

  .factory('AuthInterceptor', function ($q, $window, AuthTool, API_ENDPOINT) {
    return {
      response: function (response) {
        if (response.config.url.indexOf(API_ENDPOINT.url) === 0 && response.data.token) {
          AuthTool.saveToken(response.data.token);
        }

        return response;
      },
      request: function (config) {
        var token = AuthTool.getToken();
        if (config.url.indexOf(API_ENDPOINT.url) === 0 && token) {
          config.headers.Authorization = token;
        }

        return config;
      },
      responseError: function (response) {
        if (response.status === 401) {
          $window.open('/', '_self');
        }

        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });