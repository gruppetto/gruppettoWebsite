angular.module('app')

  .service('Session', function ($http, $q, API_ENDPOINT, AuthTool) {
    var self = this;

    this.create = function (data) {
      AuthTool.saveToken(data.token);

      self.id = data.token;
      self.userId = data.token;
      self.userRole = 'member';

    };

    this.destroy = function () {
      self.id = null;
      self.userId = null;
      self.userRole = null;

      AuthTool.deleteToken();

      return $q.resolve(null);
    };

  });
