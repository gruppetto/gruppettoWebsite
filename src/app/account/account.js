angular.module('app')
  .controller('accountCtrl', function ($http, $rootScope, API_ENDPOINT) {
    var vm = this;
    $rootScope.$broadcast('loading');

    $http.get(API_ENDPOINT.url + '/memberInfo')
      .then(function (data) {
        vm.user = data.data.user;

        $http.get(API_ENDPOINT.url + '/users/' + vm.user._id + '/groups')
          .then(function (data) {

            vm.user.groups = [];

            data.data.forEach(function (group) {
              group.admin.forEach(function (admin) {
                if (admin._id === vm.user._id) {
                  group.isAdminByUser = true;
                }
              });

              vm.user.groups.push(group);
            });

            $rootScope.$broadcast('loaded');
          });
      });

    vm.leaveGroup = function (group, index) {
      $rootScope.$broadcast('loading');

      $http.delete(API_ENDPOINT.url + '/groups/' + group._id + '/members/' + vm.user._id)
        .then(function () {
          vm.user.groups.splice(index, 1);

          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe quitté'
          });
        });
    };

    vm.deleteGroup = function (group, index) {
      $rootScope.$broadcast('loading');

      $http.delete(API_ENDPOINT.url + '/groups/' + group._id)
        .then(function () {
          vm.user.groups.splice(index, 1);

          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe supprimé'
          });
        });
    };
  });
