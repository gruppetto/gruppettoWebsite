angular.module('gruppettoApp.footer', [])
  .directive('gpFooter', function () {
    return {
      rescrict: 'E',
      templateUrl: 'app/shared/footer/footer.html'
    };
  });