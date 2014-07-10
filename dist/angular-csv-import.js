/*! angular-csv-import - v0.0.1 - 2014-07-10
* Copyright (c) 2014 ; Licensed  */
'use strict';

var fc = angular.module('ngCSVImport', []);

fc.directive('ngCSVImport', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope:{
		},
		template: '../templates/csv-import-button.html',
		link: function(scope, element) {
		}
	};
});