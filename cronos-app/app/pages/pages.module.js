(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'ui.bootstrap',
    'Cronos.common',
    'Cronos.pages.login',
    'cronos.pages.administrator',
    'Cronos.pages.user',
    'BlurAdmin.pages.dashboard',
    'Cronos.pages.downup',
    'Cronos.pages.query',
    'Cronos.pages.workflow',
    'Cronos.pages.alert',
    'Cronos.pages.role',
    'Cronos.pages.maintenance',
    'Cronos.pages.database'
  ])
      /*.config(routeConfig)*/;

  /*function routeConfig($urlRouterProvider, baSidebarServiceProvider) {

    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('', {

      })

  }*/

})();
