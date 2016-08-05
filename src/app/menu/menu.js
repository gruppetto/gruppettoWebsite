angular
  .module('app')
  .component('gptMenu', {
    templateUrl: 'app/menu/menu.html',
    controllerAs: 'vm',
    controller: function ($window, AuthService, userService) {
      var vm = this;

      vm.isAuthed = AuthService.isAuthed();

      userService.getUser()
        .then(function (user) {
          vm.user = user;
        });

      vm.logout = function () {
        AuthService.logout().then(function () {
          $window.open('/', '_self');
        });
      };
    }
  });
