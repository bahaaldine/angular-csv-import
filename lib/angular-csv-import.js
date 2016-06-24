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
			mdButtonClass: '@?',
			mdInputClass: '@?',
			mdButtonTitle: '@?',
			mdSvgIcon: '@?'
		},
		template: function(element, attrs) {
			var material = angular.isDefined(attrs.material);
			var multiple = angular.isDefined(attrs.multiple);
			return '<div class="ng-csv-import">'+
		  	'<div ng-show="headerVisible"><div class="label">Header</div><input type="checkbox" ng-model="header"></div>'+
			'<div ng-show="encoding && encodingVisible"><div class="label">Encoding</div><span>{{encoding}}</span></div>'+
			'<div ng-show="separator && separatorVisible">'+
			'<div class="label">Seperator</div>'+
			'<span><input class="separator-input" type="text" ng-change="changeSeparator" ng-model="separator"><span>'+
			'</div>'+
			'<div>' +
			'<input class="btn cta gray" type="file" '+ (multiple ? 'multiple' : '') +' accept="{{accept}}"/>' +
			(material ? '<md-button ng-click="onClick($event)" class="_md md-button {{mdButtonClass}}"><md-icon md-svg-icon="{{mdSvgIcon}}"></md-icon> {{mdButtonTitle}}</md-button><md-input-container style="margin:0;"><input type="text" class="_md md-input-readable md-input {{mdInputClass}}" ng-click="onClick($event)" ng-model="filename"></md-input-container>' : '') +
			'</div>'+
			'</div>'
		},
		link: function(scope, element, attrs) {
			scope.separatorVisible = scope.separatorVisible || false;
			scope.headerVisible = scope.headerVisible || false;
			scope.material = angular.isDefined(attrs.material);
			scope.multiple = angular.isDefined(attrs.multiple);
			if (scope.multiple)
				throw new Error("Multiple attribute is not supported yet.");
			var input = angular.element(element[0].querySelector('input[type="file"]'));
			var inputContainer = angular.element(element[0].querySelector('md-input-container'));

			if (scope.material && input) {
				input.removeClass("ng-show");
				input.addClass("ng-hide");
				var errorSpacer = angular.element(inputContainer[0].querySelector('div.md-errors-spacer'));
				errorSpacer && errorSpacer.remove();
				scope.onClick = function($event) {
					input.click();
				};
			}

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
				}
			});

			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
				scope.filename = onChangeEvent.target.files[0].name;
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
					}
				}
			});

			var csvToJSON = function(content) {
				var lines=content.csv.split('\n');
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
								obj[headers[j]] = currentline[j];
							}
						} else {
							for (var k=0; k<currentline.length; k++) {
								obj[k] = currentline[k];
							}
						}
						result.push(obj);
					}
				}
				return result;
			};
		}
	};
});