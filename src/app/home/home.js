angular
  .module('app')
  .controller('homeCtrl', function (AuthService) {
    var vm = this;

    vm.isAuthed = AuthService.isAuthed();

  });
