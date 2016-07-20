angular.module('gruppettoApp.account', [])
  .controller('accountCtrl', function ($rootScope) {

    var vm = this;

    vm.user = $rootScope.user;

    console.log(vm.user.name);

  });