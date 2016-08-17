angular
  .module('app', ['ui.materialize', 'ngRoute'])

  .run(function ($rootScope, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {


      if (next.$$route.originalPath !== '/' && next.$$route.originalPath !== '/inscription' && next.$$route.originalPath !== '/connexion') {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthed(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthed()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
      }

    });
  })

  .controller('ApplicationController', function ($scope, USER_ROLES, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })

  .factory('AuthInterceptor', function ($rootScope, $q, AuthTool, API_ENDPOINT, AUTH_EVENTS) {
    return {
      request: function (config) {
        var token = AuthTool.getToken();

        if (config.url.indexOf(API_ENDPOINT.url) === 0 && token) {
          config.headers.Authorization = token;
        }

        return config;
      },
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .directive('loginDialog', function (AUTH_EVENTS) {
    return {
      restrict: 'A',
      template: '<div ng-if="visible" ng-include="\'app/connexion/connexion.html\'"></div>',
      link: function (scope) {
        var showDialog = function () {
          scope.visible = true;
        };

        scope.visible = false;
        scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
        scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
      }
    };
  });
