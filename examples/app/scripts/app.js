'use strict';

/**
 * @ngdoc overview
 * @name examplesApp
 * @description
 * # examplesApp
 *
 * Main module of the application.
 */
angular
  .module('examplesApp', [
    'ngResource',
    'ngRoute',
    'ngCsvImport',
    'hljs'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
