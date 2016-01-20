# 节点（目录树，插件）

节点是Broccoli的核心概念，本质上代表一个目录，外观上是一个插件。接口非常简单。

## 接口简介

### new Plugin(inputNodes, options)

inputNodes是输入节点，通常就是其它插件的实例，注意是一个复数单词，也就说也可以接受节点的数组。
options:
* name ，插件名称
* annotation， 描述性的名称，在调试时，用于区分不同的实例，当然前提是你为每个实例传入不同的annotation。
* persistentOutput，如果真，在每次build之后不会自动清楚。

### Plugin.prototype.build()

在你的插件（继承自这个Plugin）中复写该方法，每次构建都会调用这个方法。插件的功能就在这里实现。通常在build方法里面使用这些只读的属性：

* this.inputPaths，通常是上游插件的输出，通过它，插件得以获取所有关注的文件。
* this.outputPath，这是一个单数的英文单词，输出目录只有一个。这并不能阻止你在该目录下创建多个目录。每次build之前，此目录自动清空。
* this.cachedPath，可以想象成一个全局变量，除非退出Broccoli，此目录在运行期内一只存在。

每次呼叫build，上述这些值都保持不变。

需要执行异步任务的话，返回Promise即可，最终的返回值一般抛弃。
报告错误，只要抛出异常或者返回Promise的reject即可。

### Plugin.prototype.getCallbackObject()

属于高阶用法。仅在实例化的时候呼叫一次。

返回一个对象，Broccoli会呼叫它的build方法，通常返回插件的this。在某些场合，特别是抽象[^1]插件，可以达成类似于aop的效果。

比如，可以拦截插件的build方法，你可以返回```return { build: this.buildWrapper.bind(this)}```。
甚至完全转交给另一个对象来处理，```return new MyPluginWorker(this.inputPaths, this.outputPath, this.cachePath)```，只要MyPluginWorker有一个build方法。

[^1]: 这里借用了java的术语，是指不是直接用来实例化，而是供其它插件开发者继承之后来开发插件。下一章提到的过滤器就是。
