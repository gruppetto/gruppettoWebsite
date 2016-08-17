angular
  .module('app')
  .component('gptMenu', {
    templateUrl: 'app/menu/menu.html',
    controllerAs: 'vm',
    controller: function ($window, $rootScope, AuthService) {
      var vm = this;

      vm.home = function () {
        $window.open('/', '_self');
      };

      vm.logout = function () {
        $rootScope.$broadcast('loading');

        AuthService.logout()
          .then(function () {
            $window.open('/', '_self');
            $rootScope.$broadcast('loaded');
          });
      };

      vm.isAuthed = AuthService.isAuthed();

      if (vm.isAuthed) {
        AuthService.getUserInformation().then(function (user) {
          vm.user = user;
        });
      }
    }
  });
