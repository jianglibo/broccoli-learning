var TreeProcessor = require('../lib/tree-processor');
var util = require("util");
var assert = require('assert');

describe('TreeProcessor', function() {

  describe('#transform()', function() {
    it('should ok', function() {
      var lines = [];
      lines[0] = "---dtree---";
      lines[1] = "myproject";
      lines[2] = "*app";
      lines[3] = "**coffee";
      lines[4] = "***app.coffee";
      lines[5] = "**scss";
      lines[6] = "***_variables.scss";
      lines[7] = "***app.scss";
      lines[8] = "*Brocfile.js";
      lines[9] = "---enddtree---";


      var sc = lines.slice(1, 9);
      assert.equal('myproject', sc[0]);
      assert.equal('*Brocfile.js', sc[sc.length - 1]);
      var tp = new TreeProcessor(lines, '---dtree---', '---enddtree---');
      assert.equal('START', tp.lineType(lines[0]));
      assert.equal('END', tp.lineType(lines[9]));
      assert.equal('NO', tp.lineType(lines[2]));

      var leadingChar = tp.leadingChar(sc);
      assert.equal("*", leadingChar);

      var topLine = tp._transform(sc);
      topLine.children.forEach(function(it){
        // console.log(util.inspect(it, 10));
      });
      var colloctor = [];

      topLine.toLines(colloctor);
    });
  });

  describe('#lineType()', function() {
    it('should ok', function() {
      var lines = ['a','b', 'c'];
      var tp = new TreeProcessor(lines, 'a', 'b');
      assert.equal('START', tp.lineType(lines[0]));
      assert.equal('END', tp.lineType(lines[1]));
      assert.equal('NO', tp.lineType(lines[2]));
    });
  });


  describe('regex', function() {
    it('is alpha', function() {
      var re = /\w/;
      assert.ok(re.exec('a'));
      assert.ok(re.exec('aaaa'));
      assert.ok(!re.exec(' '));
      assert.ok(!re.exec('*'));
      assert.ok(!re.exec('.'));
      assert.ok(!re.exec('  '));
    });
  });
  describe('#process()', function() {
    it('blocks', function() {
      var lines = ['a','c','d', 'b'];
      var tp = new TreeProcessor(lines, 'a', 'b');
      var newlines = tp.process(lines); //应该是中间2行，c，d
      assert.equal(2, newlines.length);
    });
  });


  describe('#splitLine()', function() {
    it('split', function() {
      var lines = ['a','*c','*d', 'b'];
      var tp = new TreeProcessor(lines, 'a', 'b');
      var o = tp.splitLine("*ab", "*");
      assert.equal(1, o.level);
      assert.equal("ab", o.content);

      o = tp.splitLine("ab", "*");
      assert.equal(0, o.level);
      assert.equal("ab", o.content);
    });
  });

  describe('#leadingChar()', function() {
    it('should be c', function() {
      var lines = ['c','d'];
      var tp = new TreeProcessor(lines, 'a', 'b');
      var leaderChar = tp.leadingChar(lines);
      assert.equal('c', leaderChar);
    });

    it('should be 1', function() {
      var lines = [' c',' d'];
      var tp = new TreeProcessor(lines, 'a', 'b');
      var leaderChar = tp.leadingChar(lines);
      assert.equal(' ', leaderChar);
    });

    it('should be space', function() {
      var lines = ['a', 'ab', ' c',' d'];
      var tp = new TreeProcessor(lines, 'a', 'b');
      var leaderChar = tp.leadingChar(lines);
      assert.equal(' ', leaderChar);
    });

    it('should be alpha', function() {
      var lines = ['a', 'ab', 'ax', ' c',' d'];
      var tp = new TreeProcessor(lines, 'a', 'b');
      var leaderChar = tp.leadingChar(lines);
      assert.equal('a', leaderChar);
    });
  });
});
