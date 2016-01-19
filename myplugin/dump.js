var Filter = require('broccoli-filter');

Dump.prototype = Object.create(Filter.prototype);
Dump.prototype.constructor = Dump;
function Dump(inputNode, search, replace, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.search = search;
  this.replace = replace;
}

Dump.prototype.extensions = ['txt'];
Dump.prototype.targetExtension = 'txt';

Dump.prototype.processString = function(content, relativePath) {
  console.log(relativePath);
  return content.replace(this.search, this.replace);
};

module.exports = Dump;
