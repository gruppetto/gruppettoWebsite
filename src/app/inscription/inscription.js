angular
  .module('app')
  .controller('inscriptionCtrl', function ($state, AuthService, $http, API_ENDPOINT) {
    var vm = this;

    /*vm.signup = function () {
     $http({
     method: 'POST',
     url: API_ENDPOINT + '/signup',
     headers: {
     'Content-Type': 'application/json'
     },
     data: vm.user
     })
     .then(function (data) {
     console.log(data);
     if (data.data.success) {

     $http({
     method: 'POST',
     url: API_ENDPOINT + '/authenticate',
     headers: {
     'Content-Type': 'application/json'
     },
     data: {
     email: vm.user.email,
     password: vm.user.password
     }
     })
     .then(function (data) {
     console.log(data);
     console.log(data.data.token);
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
     };*/

    vm.signup = function () {
      AuthService.register(vm.user)
        .then(function (msg) {
          $state.go('outside.connexion');

        }, function (errMsg) {

        });
    }
  });
