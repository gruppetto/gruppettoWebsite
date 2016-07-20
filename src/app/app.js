require('angular');
require('angular-route');
require('angular-materialize');

require('./services/authenticationService.js');

require('./shared/header/header.js');
require('./shared/footer/footer.js');

require('./components/home/home.js');
require('./components/about/about.js');

angular.module('gruppettoApp',
  [
    'ngRoute',
    require('angular-materialize'),
    'gruppettoApp.services',
    'gruppettoApp.header',
    'gruppettoApp.footer',
    'gruppettoApp.home',
    'gruppettoApp.about'
  ])

  .run(['$rootScope', '$window', 'sAuth',
    function($rootScope, $window, sAuth) {

      $rootScope.user = {};

      $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded

        FB.init({

          /*
           The app id of the web app;
           To register a new app visit Facebook App Dashboard
           ( https://developers.facebook.com/apps/ )
           */

          appId: '1150889901638663',

          /*
           Adding a Channel File improves the performance
           of the javascript SDK, by addressing issues
           with cross-domain communication in certain browsers.
           */

          channelUrl: 'app/channel.html',

          /*
           Set if you want to check the authentication status
           at the start up of the app
           */

          status: true,

          /*
           Enable cookies to allow the server to access
           the session
           */

          cookie: true,

          /* Parse XFBML */

          xfbml: true,

          version: 'v2.4'
        });

        sAuth.watchAuthenticationStatusChange();

      };

      (function(d){
        // load the Facebook javascript SDK

        var js,
          id = 'facebook-jssdk',
          ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
          return;
        }

        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/fr_FR/sdk.js";

        ref.parentNode.insertBefore(js, ref);

      }(document));

    }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/home/home.html',
        controller: 'homeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });