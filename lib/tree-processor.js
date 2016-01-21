module.exports = TreeProcessor;

function TreeProcessor(allLines, startTag, endTag) {
  this.startTag = startTag;
  this.endTag = endTag;
  this.blocks = [];
}

TreeProcessor.prototype.process = function(allLines) {
  var i = 0,
    lt,
    treeStarted = false,
    block = [];

  allLines.forEach(function(line, idx) {
    lt = this.lineType(line);
    if (lt === 'NO') {
      block.push(line);
    } else {
      if (lt === 'START') {
        treeStarted = true;
        if (block.length > 0) {
          this.blocks.push(block);
        }
      } else {
        treeStarted = false;
        if (block.length > 0) {
          this.blocks.push(this.transform(block));
        }
      }
      block = [];
    }
  }, this);

  if (block.length > 0) {
    if (treeStarted) {
      this.blocks.push(this.transform(block));
    } else {
      this.blocks.push(block);
    }
  }
};

TreeProcessor.prototype.transform = function(block) {
  var colloctor = [];
  var topLine = this._transform(block);
  topLine.toLines(colloctor);
  return colloctor;
};

TreeProcessor.prototype._transform = function(block) {
  var leadingChar = this.leadingChar(block);
  var topLine = new Line();
  var currentLine = topLine;
  block.forEach(function(it) {
    if (it.trim()) {
      currentLine = currentLine.addChild(this.splitLine(it, leadingChar));
    }
  }, this);

  topLine.setupMeta();
  return topLine;
};

TreeProcessor.prototype.splitLine = function(line, leadinigChar) {
  var level = 0,
    content;
  for (var i = 0; i < line.length; i++) {
    if (line.charAt(i) === leadinigChar) {
      level++;
    } else {
      content = line.substring(i);
      break;
    }
  }
  return {
    level: level,
    content: content
  };
};

TreeProcessor.prototype.leadingChar = function(block) {
  var countmap = {},
    leader,
    oneCount,
    max = 0,
    maxLeaders = [];

  block.forEach(function(line) {
    if (line.trim().length > 0) {
      leader = line.charAt(0);
      if (countmap[leader]) {
        countmap[leader] = countmap[leader] + 1;
      } else {
        countmap[leader] = 1;
      }
    }
  });

  Object.keys(countmap).forEach(function(key) {
    oneCount = countmap[key];
    if (oneCount > max) {
      max = oneCount;
    }
  });

  Object.keys(countmap).forEach(function(key) {
    oneCount = countmap[key];
    if (oneCount === max) {
      maxLeaders.push(key);
    }
  })

  if (maxLeaders.length > 1) {
    var re = /\w/;
    for (var i = 0; i < maxLeaders.length; i++) {
      if (!re.exec(maxLeaders[i])) {
        return maxLeaders[i];
      }
    }
  }
  return maxLeaders[0];
};

TreeProcessor.prototype.lineType = function(line) {
  if (line.indexOf(this.startTag) !== -1) {
    return 'START';
  } else if (line.indexOf(this.endTag) !== -1) {
    return 'END';
  } else {
    return 'NO';
  }
};

function Line(lineo) {
  if (!lineo) {
    this.level = -1;
    this.content = "";
  } else {
    this.level = lineo.level;
    this.content = lineo.content;
  }
  this.children = [];
  this.parent = null;
}

Line.prototype.setupMeta = function() {
  var len = this.children.length,
    o;

  if (len > 0) {
    //第一个
    o = this.children[0];
    o.selfPrefix = "├── ";
    o.childPrefix = "|   ";
    for (var i = 1; i < len - 1; i++) { //第二个开始
      o = this.children[i];
      o.selfPrefix = "│   ";
      o.childPrefix = "│   ";
    }
    //最后一个
    o = this.children[len - 1];
    o.selfPrefix = "└── ";
    o.childPrefix = "    ";

  }

  this.children.forEach(function(it) {
    it.setupMeta();
  });
};

Line.prototype.toLines = function(colloctor) {
  var p = this.parent,
    childPrefix,
    content;

  if (this.level !== -1) { //is top
    content = this.selfPrefix + this.content;
    while (p && (p.level !== -1)) {
      childPrefix = p.childPrefix || "    ";
      content = childPrefix + content;
      p = p.parent;
    }
    console.log(content);
    colloctor.push(content);
  }

  this.children.forEach(function(it) {
    it.toLines(colloctor);
  });
  return colloctor;
};

Line.prototype.addChild = function(lineo) {
  var ld = lineo.level - this.level; //正数表示低级别，top是-1
  var result;
  if (ld === 0) { //同级
    return this.parent.addChild(lineo);
  } else if (ld > 0) { //最多低一级，不会跳跃
    result = new Line(lineo);
    this.children.push(result);
    result.parent = this;
    return result;
  } else { // 这个是可能跳跃的。
    var p = this;
    for (; ld <= 0; ld++) {
      if (!p.parent) {
        break;
      }
      p = p.parent;
    }
    return p.addChild(lineo);
  }
};
