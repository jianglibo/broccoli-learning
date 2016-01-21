var Filter = require('broccoli-filter');
var path = require('path');
var fs = require('fs');
var TreeProcessor = require('./tree-processor');

DtreeFilter.prototype = Object.create(Filter.prototype);
DtreeFilter.prototype.constructor = DtreeFilter;

function DtreeFilter(inputNode, startTag, endTag, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.startTag = startTag || "---dtree---";
  this.endTag = endTag || "---dtreeend---";
}

DtreeFilter.prototype.extensions = ['md'];
DtreeFilter.prototype.targetExtension = 'md'; //被处理的extension之后的extension。

DtreeFilter.prototype.processString = function(content, relativePath) {
  var lines = content.split("\n");

  return new TreeProcessor(lines, this.startTag, this.endTag).process(lines).join("\n");
};

module.exports = DtreeFilter;
