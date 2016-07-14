'use strict';

var csvImport = angular.module('ngCsvImport', []);

csvImport.directive('ngCsvImport', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope:{
			content:'=?',
			header: '=?',
			headerVisible: '=?',
			separator: '=?',
			separatorVisible: '=?',
			result: '=?',
			encoding: '=?',
			encodingVisible: '=?',
			accept: '=?',
			acceptSize: '=?',
			acceptSizeExceedCallback: '=?',
			callback: '=?'
		},
		template: '<div>'+
		  '<div ng-show="headerVisible"><div class="label">Header</div><input type="checkbox" ng-model="header"></div>'+
			'<div ng-show="encoding && encodingVisible"><div class="label">Encoding</div><span>{{encoding}}</span></div>'+
			'<div ng-show="separator && separatorVisible">'+
			'<div class="label">Seperator</div>'+
			'<span><input class="separator-input" type="text" ng-change="changeSeparator" ng-model="separator"><span>'+
			'</div>'+
			'<div><input class="btn cta gray" type="file" multiple accept="{{accept}}"/></div>'+
			'</div>',
		link: function(scope, element) {
			scope.separatorVisible = scope.separatorVisible || false;
			scope.headerVisible = scope.headerVisible || false;
			scope.acceptSize = scope.acceptSize || Number.POSITIVE_INFINITY;

			angular.element(element[0].querySelector('.separator-input')).on('keyup', function(e) {
				if ( scope.content != null ) {
					var content = {
						csv: scope.content,
						header: scope.header,
						separator: e.target.value,
						encoding: scope.encoding
					};
					scope.result = csvToJSON(content);
					scope.$apply();
					if ( typeof scope.callback === 'function' ) {
						scope.callback(e);
					}
				}
			});

			element.on('change', function(onChangeEvent) {
				if (!onChangeEvent.target.files.length){
					return;
				}

				if (onChangeEvent.target.files[0].size > scope.acceptSize){
					if ( typeof scope.acceptSizeExceedCallback === 'function' ) {
						scope.acceptSizeExceedCallback(onChangeEvent.target.files[0]);
					}
					return;
				}

				scope.filename = onChangeEvent.target.files[0].name;
				var reader = new FileReader();
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						var content = {
							csv: onLoadEvent.target.result.replace(/\r\n|\r/g,'\n'),
							header: scope.header,
							separator: scope.separator
						};
						scope.content = content.csv;
						scope.result = csvToJSON(content);
						scope.result.filename = scope.filename;
						scope.$$postDigest(function(){
							if ( typeof scope.callback === 'function' ) {
								scope.callback(onChangeEvent);
							}
						});
					});
				};

				if ( (onChangeEvent.target.type === "file") && (onChangeEvent.target.files != null || onChangeEvent.srcElement.files != null) )  {
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0], scope.encoding);
				} else {
					if ( scope.content != null ) {
						var content = {
							csv: scope.content,
							header: !scope.header,
							separator: scope.separator
						};
						scope.result = csvToJSON(content);
						scope.$$postDigest(function(){
							if ( typeof scope.callback === 'function' ) {
								scope.callback(onChangeEvent);
							}
						});
					}
				}
			});

			var csvToJSON = function(content) {
				var lines=content.csv.split(new RegExp('\n(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
				var result = [];
				var start = 0;
				var columnCount = lines[0].split(content.separator).length;

				var headers = [];
				if (content.header) {
					headers=lines[0].split(content.separator);
					start = 1;
				}

				for (var i=start; i<lines.length; i++) {
					var obj = {};
					var currentline=lines[i].split(new RegExp(content.separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
					if ( currentline.length === columnCount ) {
						if (content.header) {
							for (var j=0; j<headers.length; j++) {
								obj[headers[j]] = cleanCsvValue(currentline[j]);
							}
						} else {
							for (var k=0; k<currentline.length; k++) {
								obj[k] = cleanCsvValue(currentline[k]);
							}
						}
						result.push(obj);
					}
				}
				return result;
			};

			var cleanCsvValue = function(value) {
				return value
					.replace(/^\s*|\s*$/g,"") // remove leading & trailing space
					.replace(/^"|"$/g,"") // remove " on the beginning and end
					.replace(/""/g,'"'); // replace "" with "
			};
		}
	};
});
