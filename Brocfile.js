// var Funnel = require('broccoli-funnel');
var DtreeFilter = require('./lib/dtree-filter');
var rimraf = require('rimraf');
var fs = require('fs');

var outputPath = "gitbook";


//说到底，不过是一个普通的node模块而已。
// 用node Brocfile.js也可以运行。

if (fs.existsSync(outputPath)) {
  rimraf.sync(outputPath);
}

var node = new DtreeFilter('gitbooking');

module.exports = node;

/*
function getBuilder () {
  var tree = broccoli.loadBrocfile()
  return new broccoli.Builder(tree)
}

function loadBrocfile () {
  var brocfile = findup('Brocfile.js', {
    nocase: true
  })

  if (brocfile == null) throw new Error('Brocfile.js not found')

  var baseDir = path.dirname(brocfile)

  // The chdir should perhaps live somewhere else and not be a side effect of
  // this function, or go away entirely
  process.chdir(baseDir)

  var tree = require(brocfile)

  return tree
}

program.command('build <target>')
  .description('output files to target directory')
  .action(function(outputDir) {
    actionPerformed = true
    if (fs.existsSync(outputDir)) {
      console.error(outputDir + '/ already exists; we cannot build into an existing directory')
      process.exit(1)
    }
    var builder = getBuilder()
    builder.build()
      .then(function (hash) {
        var dir = hash.directory
        copyDereferenceSync(dir, outputDir)
      })
      .finally(function () {
        return builder.cleanup()
      })
      .then(function () {
        process.exit(0)
      })
      .catch(function (err) {
        // Should show file and line/col if present
        if (err.file) {
          console.error('File: ' + err.file)
        }
        console.error(err.stack)
        console.error('\nBuild failed')
        process.exit(1)
      })
  })
*/

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


// exports是指向module.exports的引用。
