'use strict';
/**
 * Created by martindeligny1 on 12/10/15.
 */

angular.module('app')

  .controller('loaderController', function ($scope) {
    var vm = this;

    function resetLoader() {
      vm.loading = false;
      vm.progress = 0;
      vm.maxProgress = 0;
    }

    resetLoader();

    $scope.$on('loading', function () {
      vm.loading = true;
    });

    $scope.$on('loaded', function () {
      resetLoader();
    });

  })

  .directive('gptLoader', function () {
    return {
      rescrict: 'E',
      replace: true,
      scope: {},
      controller: 'loaderController',
      controllerAs: 'vm',
      template: '' +
      '<div ng-show="vm.loading" style="position:fixed;background:rgba(0,0,0,0.8);display:block;z-index:999999;width:100%;height:100%;">' +
      '<div class="valign-wrapper" style="height:100%">' +
      '<div class="valign" style="margin:auto;text-align: center;">'+
      '<div class="preloader-wrapper small active">' +
      '<div class="spinner-layer ">' +
      '<div class="circle-clipper left">' +
      '<div class="circle"></div>' +
      '</div><div class="gap-patch">'+
      '<div class="circle"></div>'+
      '</div><div class="circle-clipper right">'+
      '<div class="circle"></div>'+
      '</div>'+
      '</div>'+
      '</div><br/>' +

      '<div class="white-text">Loading ...</div>' +
      '</div>'+
      '</div>'+
      '</div>'
    };
  })
;
