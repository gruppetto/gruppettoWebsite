angular
  .module('app')
  .controller('inscriptionCtrl', function ($state, $window, AuthService) {
    var vm = this;

    vm.signup = function () {
      AuthService.signup(vm.user)
        .then(function (data) {
          if (data.data.success) {
            AuthService.login(vm.user)
              .then(function (data) {
                if (data.data.success) {
                  $window.open('/account', '_self');
                }
                else {
                  vm.errorMessage = data.data.msg;
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          }
          else {
            vm.errorMessage = data.data.msg;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    };
  });
