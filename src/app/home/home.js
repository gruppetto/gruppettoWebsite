angular
  .module('app')
  .controller('homeCtrl', function ($timeout, AuthService) {
    var vm = this;

    vm.isAuthed = AuthService.isAuthed();

  });
