angular.module('app')
  .controller('userCtrl', function ($http, $routeParams, $rootScope, API_ENDPOINT) {

    var vm = this;

    $rootScope.$broadcast('loading');

    $http.get(API_ENDPOINT.url + '/users/' + $routeParams.id)
      .then(function (data) {
        console.log(data);
        vm.user = data.data;

        $http.get(API_ENDPOINT.url + '/users/' + vm.user._id + '/groups')
          .then(function (data) {
            vm.user.groups = data.data;

            $rootScope.$broadcast('loaded');
          });
      });
  });
