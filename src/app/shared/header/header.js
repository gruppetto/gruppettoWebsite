angular.module('gruppettoApp.header', [])
  .controller('headerCtrl', function ($rootScope) {

    $rootScope.$watch('user', function (n) {
      console.log(n);
    });

  })
  .directive('gpHeader', function () {
    return {
      rescrict: 'E',
      templateUrl: 'app/shared/header/header.html',
      controller: 'headerCtrl'
    };
  });