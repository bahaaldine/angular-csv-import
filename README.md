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
	material
	md-button-class="md-icon-button md-raised md-accent"
	md-svg-icon="file:ic_file_upload_24px"
	header="csv.header"
	separator="csv.separator"
	result="csv.result"
	accept="csv.accept"></ng-csv-import>
```

- **multiple**

If `multiple` attribute setted the directive will thow an error due a not implemented yet logic.

- **material**

Attribute to tell to the directive to activate the material power!

- **md-button-class**

Attribute to personalize the md-button inside the directive

- **md-svg-icon**

The icon to show in md-button

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

- **csv.accept**

An optional variable to limit what file types are accepted. Ex. ".csv" to only accept csv file types.

- **csv.acceptSize**

An optional variable to limit the size of the files that are accepted in bytes. Ex. "1024" to only accept files up to 1kB.

- **csv.acceptSizeExceedCallback**

An optional variable to pass in a callback to execute if the user attempted to upload a file larger than csv.acceptSize. Will run instead of parsing.

- **csv.callback**

An optional variable to pass in a callback to execute once the file has been parsed. Will run following any successful parsing (ie change file, change separator, etc...).
