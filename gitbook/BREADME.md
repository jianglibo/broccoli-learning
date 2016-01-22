# Broccoli在github上的README

一个可靠高速的静态资源处理管道，简洁的定义，快速的重建。如果非要拿什么来比的话，Rails的asset pipeline和broccoli在功能上有比较大的交集。只不过后者运行在Node环境下，和你使用的后台技术无关。即使你使用spring boot，也可以享受broccoli带来的福利。想要了解项目的背景和整体架构，请移步[介绍博客](https://www.solitr.com/blog/2014/02/broccoli-first-release/)。

## 安装

```shell
npm install --save-dev broccoli
npm install --global broccoli-cli
```
## Brocfile.js

项目的根目录中的Brocfile.js用来描述构建。它必须输出一个节点（Node）。

节点可以是一个目录的名称，或者一个插件（Plugin）。在Brocfile.js中通常在目录层面描述，具体的构建交给插件。

一个最简单的Brocfile.js.
```js
module.exports = 'app';
```

{% asciitree %}
app
-main.js
-helper.js
Brocfile.js
package.json
{% endasciitree %}

示例的目录：
```
{% asciitree %}
app
-main.js
-helper.js
Brocfile.js
package.json
{% endasciitree %}
```

运行broccoli build the-output之后：
```
{% asciitree %}
the-output
-main.js
-helper.js
{% endasciitree %}
```

## 在Brocfile.js里面使用插件

下面的Brocfile.js将app的内容复制到appKit.
```js
var Funnel = require('broccoli-funnel')

module.exports = new Funnel('app', {
  destDir: 'appkit'
})
```
运行broccoli build the-output之后，结果如下：

```
{% asciitree %}
the-output
-appkit
--main.js
--helper.js
{% endasciitree %}
```

## 插件API规范（这个已经过时了）

新的机制是只要继承Plugin对象即可。

请继续阅读其它章节。
