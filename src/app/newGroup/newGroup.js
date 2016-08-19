angular.module('app')
  .controller('newGroupCtrl', function ($http, $rootScope, $window, API_ENDPOINT) {
    var vm = this;

    $http.get(API_ENDPOINT.url + '/memberInfo').then(function (data) {
      vm.user = data.data.user;
    });

    vm.createGroup = function () {
      $rootScope.$broadcast('loading');
      $http.post(API_ENDPOINT.url + '/users/' + vm.user._id + '/groups', vm.group)
        .then(function () {
          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe créé'
          });

          $window.open('/account', '_self');

        });
    };
  });
