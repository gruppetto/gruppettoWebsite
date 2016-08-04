angular
  .module('app')
  .component('gptMenu', {
    templateUrl: 'app/menu/menu.html',
    controllerAs: 'vm',
    controller: function ($window, AuthService) {
      var vm = this;

      vm.isAuthed = AuthService.isAuthed();

      vm.logout = function () {
        AuthService.logout().then(function () {
          $window.open('/', '_self');
        });
      };
    }
  });
