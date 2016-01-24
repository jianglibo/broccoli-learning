var path = require('path');
var fs = require('fs');
var readline = require('readline');
var assert = require('assert');

describe('Fs', function() {
  describe('#readFileSync()', function() {
    it('should return hello', function() {
      var c = fs.readFileSync("app/html/treedisplay.md", {
        encoding: 'utf8'
      });
      var lines = c.split('\n');
      assert.equal(13, lines.length);
      assert.equal(c, lines.join('\n'));
    });
  });
});

describe('ReadLine', function() {
  describe('#readline()', function() {
    it('should match', function() {
      var lineReader = readline.createInterface({
        input: fs.createReadStream('app/html/treedisplay.md')
      });

      lineReader.on('line', function(line) {
        // console.log('Line from file:', line);
      });
    });
  });
});

describe('Regex', function() {
  describe('#exec()', function() {
    it('should match', function() {
      var str = "---abc---,---abc---";
      var re = /---(.*?)--/;
      var result = re.exec(str);
      // console.log(result.index);
      assert.equal("abc", result[1]);
      assert.equal(2, result.length);
    });
  });
});



describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(5));
      assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});
