# modmod
> make `require`-ing modules less require-y.


## Getting Started

```bash
$ npm install --save modmod
```

Then, change your code from:

```js
var fs = require('fs');
var chalk = require('chalk');
var wiredep = require('wiredep');

fs.writeFile('results.json', wiredep(), function (err) {
  if (err) {
    console.log(chalk.red.bold(err));
  }
});
```

...to...

```js
var $ = require('modmod')('fs', 'chalk', 'wiredep');

$.fs.writeFile('results.json', $.wiredep(), function (err) {
  if (err) {
    console.log($.chalk.red.bold(err));
  }
});
```


## Local vs External Modules
`modmod` is only intended to be used with external (npm-land) modules, and Node's native modules (`http`, `fs`, etc.). If you would like to namespace your local modules, you are welcome to assign additional objects on top of the object `modmod` returns. As an example:

```js
var $ = require('modmod')('fs', 'chalk', 'wiredep');

$.local = {
  helpers: require('./helpers'),
  utils: require('./utils')
};
```


## Why use `modmod`?

It's up to you. There's nothing wrong with the current system of multiple var declarations, and having too many isn't a node problem. Regardless, you may still consider it useful to namespace your dependencies under a name of your choosing, such as `M` or `$`, freeing up those "global" variables for use without conflicts.


## License

MIT © [Stephen Sawchuk](http://sawchuk.me)
