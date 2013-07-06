var coffee = require('../');
var should = require('should');
var coffeescript = require('coffee-script');
require('mocha');

describe('gulp-coffee', function() {
  describe('coffee()', function() {
    it('should concat two files', function(done) {
      var stream = coffee({bare: true});
      var fakeFile = {
        path: "/home/contra/test/file.coffee",
        shortened: "file.coffee",
        contents: new Buffer("a = 2")
      };

      var expected = coffeescript.compile(String(fakeFile.contents), {bare:true});
      stream.on('error', done);
      stream.on('data', function(newFile){
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.shortened);
        should.exist(newFile.contents);

        newFile.path.should.equal("/home/contra/test/file.js");
        newFile.shortened.should.equal("file.js");
        String(newFile.contents).should.equal(expected);
        done();
      });
      stream.write(fakeFile);
    });
  });
});
