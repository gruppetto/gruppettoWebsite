angular.module('gruppettoApp.services', [])
  .service('sAuth', function($rootScope) {

    this.watchAuthenticationStatusChange = function() {

      var _self = this;

      FB.Event.subscribe('auth.authResponseChange', function(res) {

        if (res.status === 'connected') {

          /*
           The user is already logged,
           is possible retrieve his personal info
           */

          console.log(res);
          _self.getUserInfo();

          /*
           This is also the point where you should create a
           session for the current user.
           For this purpose you can use the data inside the
           res.authResponse object.
           */

        }
        else {

          console.log('offline');

          /*
           The user is not logged to the app, or into Facebook:
           destroy the session on the server.
           */

        }

      });

    };

    this.getUserInfo = function() {

      var _self = this;

      FB.api('/me?fields=picture,name,id,about,email', function(response) {
        console.log(response);
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = response;
        });

        var body = {
          fbId : response.id,
          name : response.name,
          pictureUrl : response.picture.data.url,
          email: response.email
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://gruppettoapi.herokuapp.com/login", true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(body));
        // post sur /users/login

        xhr.onloadend = function (response) {
          // done
          console.log('ok');
          console.log(response);

        };

      });

    };

    this.logout = function() {

      var _self = this;

      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
        });
      });

    }

  });