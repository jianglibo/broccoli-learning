var Filter = require('broccoli-filter');
var path = require('path');
var fs = require('fs');

var re = /---ftreestart---(.*?)---ftreeend---/gm;

TreeDisplay.prototype = Object.create(Filter.prototype);
TreeDisplay.prototype.constructor = TreeDisplay;
function TreeDisplay(inputNode, search, replace, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.search = search;
  this.replace = replace;
}

function replacer(match, p1, offset, string) {
  console.log('-----------');
  console.log(match);
  console.log('-----------');
  console.log(p1);
  console.log(offset);
  console.log(string);
  return "";
}

TreeDisplay.prototype.extensions = ['md'];
TreeDisplay.prototype.targetExtension = 'md';//被处理的extension之后的extension。

TreeDisplay.prototype.processString = function(content, relativePath) {
  fs.writeFileSync(path.join(this.outputPath,'message.md'), 'Hello Node'); //增加文件
  console.log(re.exec(content));
  content.replace(re, function(match, p1) {
    console.log(match);
    console.log(p1);
  });
  return content.replace(this.search, this.replace);
};

module.exports = TreeDisplay;
