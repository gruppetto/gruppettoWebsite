angular.module('app')
  .controller('groupCtrl', function ($http, $routeParams, $window, $rootScope, API_ENDPOINT) {

    var vm = this;

    vm.joinGroup = function () {
      $rootScope.$broadcast('loading');

      $http.post(API_ENDPOINT.url + '/groups/' + vm.group._id + '/members/', {memberId: vm.user._id})
        .then(function (data) {
          vm.group.members.push(vm.user);
          vm.group.hasUserAsMember = true;
          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe rejoint'
          });
        });
    };

    vm.leaveGroup = function () {
      $rootScope.$broadcast('loading');

      $http.delete(API_ENDPOINT.url + '/groups/' + vm.group._id + '/members/' + vm.user._id)
        .then(function () {

          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe quitté'
          });

          $window.open('/groups', '_self');

        });
    };

    vm.deleteGroup = function () {
      $rootScope.$broadcast('loading');

      $http.delete(API_ENDPOINT.url + '/groups/' + vm.group._id)
        .then(function () {
          $rootScope.$broadcast('loaded');

          $rootScope.$broadcast('notify', {
            title: 'Succès',
            body: 'Groupe supprimé'
          });
          $window.open('/groups', '_self');

        });
    };

    $rootScope.$broadcast('loading');

    $http.get(API_ENDPOINT.url + '/memberInfo')
      .then(function (data) {
        vm.user = data.data.user;

        $http.get(API_ENDPOINT.url + '/groups/' + $routeParams.id)
          .then(function (data) {

            vm.group = data.data;

            vm.group.admin.forEach(function (admin) {
              if (admin._id === vm.user._id) {
                vm.group.isAdminByUser = true;
              }
            });

            vm.group.members.forEach(function (member) {
              if (member._id === vm.user._id) {
                vm.group.hasUserAsMember = true;
              }
            });

            $rootScope.$broadcast('loaded');
          });
      });
  });
