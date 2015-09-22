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
	header="csv.header" 
	separator="csv.separator"
	result="csv.result"></ng-csv-import>
```

- **csv.content**

A variable which will contain the content loaded by the file input

- **csv.header**

A variable that says whether or not the source CSV file contains headers

- **csv.headerVisible**

A variable to toggle header visibility

- **csv.separator**

A variable containing the separtor used in the CSV file

- **csv.separatorVisible**

A variable to toggle separator visibility

- **csv.encoding**

A variable to set the CSV file encoding

- **csv.encodingVisible**

A variable to toggle encoding visibility

- **csv.result**

A variable which will contain the result of the CSV to JSON marshalling.
