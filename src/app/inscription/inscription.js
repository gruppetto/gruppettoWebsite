angular
  .module('app')
  .controller('inscriptionCtrl', function ($window, $rootScope, AuthService) {
    var vm = this;

    vm.signup = function () {
      $rootScope.$broadcast('loading');
      AuthService.register(vm.user)
        .then(function (data) {
          if (data.data.success) {
            AuthService.login(vm.user)
              .then(function (data) {
                console.log(data);
                if (data.success) {
                  $window.open('/account', '_self');
                  $rootScope.$broadcast('loaded');
                }
                else {
                  $rootScope.$broadcast('loaded');
                  vm.errorMessage = data.data.msg;
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          }
          else {
            $rootScope.$broadcast('loaded');
            vm.errorMessage = data.data.msg;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  });
