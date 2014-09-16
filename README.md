[![Build Status](https://travis-ci.org/bahaaldine/angular-csv-import.svg?branch=master)](https://travis-ci.org/bahaaldine/angular-csv-import)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

# Angular CSV Import

## Demo page

http://bahaaldine.github.io/angular-csv-import

## Installation

Install depedencies using bower: 
```
bower install angular-csv-import
```

Add js libraries to your application:
```html
	...
	<script src="bower_components/angular-csv-import/dist/angular-csv-import.js"></script>
    ...
```

Add ngCSVImport module to you application
```javascript
	...
	angular
	  .module('myAwesomeApp', [
	    ...
	    'ngCsvImport',
	    ...
	  ])
	...
```

## Usage
Include the **ng-csv-import** element with its options:

```html
<ng-csv-import content="csv.content"
	header="true" 
	separator=","
	result="csv.result"></ng-csv-import>
```

- **csv.content**

A variable which will contain the content loaded by the file input

- **csv.result**

A variable which will contain the result of the CSV to JSON marshalling.
