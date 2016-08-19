angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($locationProvider, $routeProvider, USER_ROLES) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'homeCtrl',
      controllerAs: 'vm',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .when('/inscription', {
      templateUrl: 'app/inscription/inscription.html',
      controller: 'inscriptionCtrl',
      controllerAs: 'vm',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .when('/connexion', {
      templateUrl: 'app/connexion/connexion.html',
      controller: 'connexionCtrl',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .when('/account', {
      templateUrl: 'app/account/account.html',
      controller: 'accountCtrl',
      controllerAs: 'vm',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.admin]
      }
    })
    .when('/newgroup', {
      templateUrl: 'app/groups/newGroup.html',
      controller: 'newGroupCtrl',
      controllerAs: 'vm',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.admin]
      }
    })
    .when('/groups', {
      templateUrl: 'app/groups/groups.html',
      controller: 'groupsCtrl',
      controllerAs: 'vm',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.admin]
      }
    })
    .when('/groups/:id', {
      templateUrl: 'app/groups/group.html',
      controller: 'groupCtrl',
      controllerAs: 'vm',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.admin]
      }
    })
    .when('/users/:id', {
      templateUrl: 'app/users/user.html',
      controller: 'userCtrl',
      controllerAs: 'vm',
      data: {
        authorizedRoles: [USER_ROLES.member, USER_ROLES.admin]
      }
    })

    .otherwise({redirectTo: '/'});
}
