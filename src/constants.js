angular
  .module('app')

  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    all: '*',
    member: 'member',
    admin: 'admin'
  })

  .constant('API_ENDPOINT', {
    url: 'https://gruppettoapi.herokuapp.com'
  });
