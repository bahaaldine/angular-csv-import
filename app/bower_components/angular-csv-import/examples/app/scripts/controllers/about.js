'use strict';

/**
 * @ngdoc function
 * @name examplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the examplesApp
 */
angular.module('examplesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
