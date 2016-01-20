// var Funnel = require('broccoli-funnel');
var TreeDisplay = require('./lib/tree-display');

// module.exports = new Funnel('app', {
//   destDir: 'appkit'
// })

var node = new TreeDisplay('app', 'ES6', 'ECMAScript 2015');

module.exports = node;

// var tree = broccoli.makeTree('lib')
// tree = compileCoffeeScript(tree)
// tree = uglifyJS(tree)
// return tree

// module.exports = function (broccoli) {
//   console.log(broccoli);
//   var filterCoffeeScript = require('broccoli-coffee');
//   var compileES6 = require('broccoli-es6-concatenator');
//
//   var sourceTree = broccoli.makeTree('lib');
//   sourceTree = filterCoffeeScript(sourceTree);
//
//   var appJs = compileES6(sourceTree, {
//     outputFile: '/assets/app.js'
//   });
//
//   var publicFiles = broccoli.makeTree('public');
//
//   return [appJs, publicFiles];
// };
