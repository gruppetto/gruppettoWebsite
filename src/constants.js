angular
  .module('app')

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  .constant('API_ENDPOINT', {
    url: 'https://gruppettoapi.herokuapp.com'
  });
