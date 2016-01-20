# 过滤器

过滤器是一个抽象类，文件的输入输出通常是一对一的关系。java的ant的属性值替换，就属于这一类。API非常简单。

```js
class Filter {
  /**
   * 处理过滤任务的抽象类
   *
   * 强制类继承自Filter，但器自己本身不是一个Filter。
   */
  constructor(inputNode: BroccoliNode, options: FilterOptions): Filter;

  /**
   * 抽象方法（必须继承），它的返回值作为输出文件的内容
   */
  abstract processString(contents: string, relativePath: string): string;

  /**

   * 虚方法（可选继承），决定文件是否需要处理，或者输出文件是否需要重命名。
   *
   * 返回 `null`，不处理，也就是不经过processString，可能是直接复制或者link。
   * 返回 `relativePath` 输出到这个文件。
   *
   * 默认的实现是：在存在extension和targetExtension选项的情况下，处理具有extension（后缀）的文件，
   * 输出到将extension替换成targetExtension的文件中。
   * 这个比较常见，比如将hbs（handlebars模板）处理成html后缀。
   */
  virtual getDestFilePath(relativePath: string): string;
}
```
## 选项
* extensions: 需要处理的文件的后缀名, e.g. ['md', 'markdown'].
* targetExtension: 替换的后缀名, e.g. 'html'.
* inputEncoding: 输入文件的编码，默认 (default: 'utf8'). 对于二进制文件，可以输入null，那么processString接收到的将会是Buffer对象。
* outputEncoding: 输出编码(default: 'utf8'). 对于二进制文件，可以输入null，那么processString将返回Buffer对象。
* name, annotation: 和插件一样。

## 一个简单的插件

```js
var Filter = require('broccoli-filter');

Awk.prototype = Object.create(Filter.prototype);
Awk.prototype.constructor = Awk;
function Awk(inputNode, search, replace, options) {
  options = options || {};
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
  this.search = search;
  this.replace = replace;
}

Awk.prototype.extensions = ['txt'];
Awk.prototype.targetExtension = 'txt';

Awk.prototype.processString = function(content, relativePath) {
  return content.replace(this.search, this.replace);
};
```
在Brocfile.js中使用：

将docs目录下的所有txt文件中的ES6替换成ECMAScript 2015.

```js
var node = new Awk('docs', 'ES6', 'ECMAScript 2015');

module.exports = node;
```
