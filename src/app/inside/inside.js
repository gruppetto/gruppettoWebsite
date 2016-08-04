angular.module('app')
  .controller('insideCtrl', function ($scope, AuthService, API_ENDPOINT, $http) {

    $http.get(API_ENDPOINT.url + '/memberInfo')
      .then(function (data) {
      console.log(data);

    })
  });