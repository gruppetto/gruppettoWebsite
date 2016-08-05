angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .state('inscription', {
      url: '/inscription',
      templateUrl: 'app/inscription/inscription.html',
      controller: 'inscriptionCtrl',
      controllerAs: 'vm'
    })
    .state('connexion', {
      url: '/connexion',
      templateUrl: 'app/connexion/connexion.html',
      controller: 'connexionCtrl',
      controllerAs: 'vm'
    })
    .state('account', {
      url: '/account',
      templateUrl: 'app/account/account.html',
      controller: 'accountCtrl',
      controllerAs: 'vm'
    })
    .state('newGroup', {
      url: '/newgroup',
      templateUrl: 'app/newGroup/newGroup.html',
      controller: 'newGroupCtrl',
      controllerAs: 'vm'
    });
}
