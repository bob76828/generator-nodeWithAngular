'use strict';

angular.module('ng.router').config(function ($urlRouterProvider, $stateProvider) {
  $stateProvider.state('common', {
    abstract: true,
    url: '',
    views: {
      '': {
        templateUrl: '../assets/client/common/layout/layout.html'
      },
      'header@common': {
        templateUrl: '../assets/client/common/layout/header.html',
        controller: 'headerCtrl'
      },
      'footer@common': {
        templateUrl: '../assets/client/common/layout/footer.html'
      }
    }
  }).state('common.main', {
    url: '/',
    views: {
      'section@common': {
        templateUrl: '../assets/client/app/main/content.html',
        controller: 'mainCtrl'
      }
    }
  });
});
