'use strict';

var fc = angular.module('ngCsvImport', []);

fc.directive('ngCsvImport', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope:{
		},
		template: '../templates/csv-import-button.html',
		link: function() {
		}
	};
});