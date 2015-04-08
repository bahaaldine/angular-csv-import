'use strict';

angular.module('examplesApp')
 .controller('MainCtrl', ['$scope', '$parse', function ($scope, $parse) {
    $scope.csv = {
    	content: null,
    	header: true,
    	separator: ',',
    	result: null
    };

    var _lastGoodResult = '';
    $scope.toPrettyJSON = function (json, tabWidth) {
			var objStr = JSON.stringify(json);
			var obj = null;
			try {
				obj = $parse(objStr)({});
			} catch(e){
				// eat $parse error
				return _lastGoodResult;
			}

			var result = JSON.stringify(obj, null, Number(tabWidth));
			_lastGoodResult = result;

			return result;
    };
}]);
