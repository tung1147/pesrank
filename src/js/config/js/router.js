angular.module('config')

/**
 * @ngInject
 */
.config(function($stateProvider,   $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/');
  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      templateUrl: 'web/app.html'
    })
    .state('app.home', {
      url: '/',
      templateUrl: 'web/home.html',
      controller: 'HomeCtrl'
    });
}) 

/**
 * @ngInject
 */
.run(function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});