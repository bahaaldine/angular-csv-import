module.exports = function () {
  var builtinLibs = require('repl')._builtinLibs;
  return [].slice.call(arguments).reduce(function (acc, key) {
    var path = builtinLibs.indexOf(key) > -1 ? key : __dirname.replace('modmod', '') + key;
    acc[key] = require(path);
    return acc;
  }, {});
};
