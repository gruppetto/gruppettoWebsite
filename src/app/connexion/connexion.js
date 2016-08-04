angular
  .module('app')
  .controller('connexionCtrl', function ($http) {
    var vm = this;

    vm.signin = function () {
      $http({
        method: 'POST',
        url: 'http://gruppettoapi.herokuapp.com/authenticate',
        headers: {
          'Content-Type': 'application/json'
        },
        data: vm.user
      })
        .then(function (data) {
          console.log(data);
          if (data.data.success) {
            console.log(data.data.token);
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
