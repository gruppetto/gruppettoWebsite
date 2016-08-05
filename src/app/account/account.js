angular.module('app')
  .controller('accountCtrl', function ($http, API_ENDPOINT) {
    var vm = this;

    $http.get(API_ENDPOINT.url + '/memberInfo')
      .then(function (data) {
        vm.user = data.data.user;

        $http.get(API_ENDPOINT.url + '/users/' + vm.user._id + '/groups')
          .then(function (data) {

            vm.user.groups = data.data;
            console.log(data.data);
          });
      });
  });
