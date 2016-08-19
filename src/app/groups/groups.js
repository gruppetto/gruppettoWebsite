angular.module('app')
  .controller('groupsCtrl', function ($http, $rootScope, API_ENDPOINT) {
    var vm = this;

    vm.joinGroup = function (group) {
      $rootScope.$broadcast('loading');

      $http.post(API_ENDPOINT.url + '/groups/' + group._id + '/members/', {memberId: vm.user._id})
        .then(function (data) {
          group.members.push(vm.user);
          group.hasUserAsMember = true;
          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe rejoint'
          });
        });
    };

    vm.leaveGroup = function (group) {
      $rootScope.$broadcast('loading');

      $http.delete(API_ENDPOINT.url + '/groups/' + group._id + '/members/' + vm.user._id)
        .then(function () {
          group.members = group.members.filter(function (memberId) {
            return memberId === vm.user._id;
          });

          group.admin = group.admin.filter(function (memberId) {
            return memberId === vm.user._id;
          });
          group.hasUserAsMember = false;

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
          vm.groups.splice(index, 1);

          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe supprimé'
          });
        });
    };

    $rootScope.$broadcast('loading');

    $http.get(API_ENDPOINT.url + '/memberInfo')
      .then(function (data) {
        vm.user = data.data.user;

        $http.get(API_ENDPOINT.url + '/groups')
          .then(function (data) {

            vm.groups = [];

            data.data.forEach(function (group) {

              group.admin.forEach(function (admin) {
                if (admin._id === vm.user._id) {
                  group.isAdminByUser = true;
                }
              });

              group.members.forEach(function (member) {
                if (member._id === vm.user._id) {
                  group.hasUserAsMember = true;
                }
              });

              vm.groups.push(group);
            });

            $rootScope.$broadcast('loaded');
          });
      });
  });
