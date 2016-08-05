angular
  .module('app')
  .controller('connexionCtrl', function ($window, AuthService) {
    var vm = this;

    vm.signin = function () {
      AuthService.login(vm.user)
        .then(function (data) {
          console.log(data);
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
    };
  });
