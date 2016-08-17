angular
  .module('app')
  .controller('connexionCtrl', function ($window, $timeout, $scope, $rootScope, AUTH_EVENTS, AuthService) {

    $scope.signin = function () {
      $rootScope.$broadcast('loading');
      AuthService.login($scope.user)
        .then(function (data) {
          if (data.success) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $timeout(function() {
              $window.open('/account', '_self');
              $rootScope.$broadcast('loaded');
            },1200);
          }
          else {
            $scope.errorMessage = data.msg;
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $rootScope.$broadcast('loaded');
          }
        })
        .catch(function (err) {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          $scope.errorMessage = 'Error while loading page...';
          $rootScope.$broadcast('loaded');
        });
    };
  });
