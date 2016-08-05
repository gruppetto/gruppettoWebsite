angular.module('app')
  .controller('newGroupCtrl', function ($http, API_ENDPOINT) {
    var vm = this;

    $http.get(API_ENDPOINT.url + '/memberInfo').then(function (data) {
      vm.user = data.data.user;
    });

    vm.createGroup = function() {
      console.log(vm.group);
      $http.post(API_ENDPOINT.url + '/users/' + vm.user._id + '/groups', vm.group).then(function(data) {
        console.log(data);
      });
    };
  });
