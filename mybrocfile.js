var DtreeFilter = require('./lib/dtree-filter');
var rimraf = require('rimraf');
var fs = require('fs');
var broccoli = require('broccoli');
var copyDereferenceSync = require('copy-dereference').sync;

var outputPath = "gitbook";

//说到底，不过是一个普通的node模块而已。
// 用node Brocfile.js也可以运行。


var node = new DtreeFilter('gitbooking');

var builder = new broccoli.Builder(node);

builder.build()
  .then(function(hash) {
    var dir = hash.directory;
    if (fs.existsSync(outputPath)) {
      rimraf.sync(outputPath);
    }
    copyDereferenceSync(dir, outputPath);
  })
  .finally(function() {
    return builder.cleanup();
  })
  .then(function() {
    process.exit(0);
  })
  .catch(function(err) {
    // Should show file and line/col if present
    if (err.file) {
      console.error('File: ' + err.file);
    }
    console.error(err.stack);
    console.error('\nBuild failed');
    process.exit(1);
  });
