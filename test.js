'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var stripDebug = require('./');

it('should strip debugging', function (cb) {
  var stream = stripDebug();

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), 'function test(){}');
    cb();
  });

  stream.write(new gutil.File({
    contents: new Buffer('function test(){debugger;}')
  }));
});

it('should strip debugging and console statements without parameters', function (cb) {
  var stream = stripDebug();

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), 'function test(){ void 0}');
    cb();
  });

  stream.write(new gutil.File({
    contents: new Buffer('function test(){debugger; console.log("Hi there")}')
  }));
});

it('should strip alert, debugging and log statements with whitelist', function (cb) {
  var stream = stripDebug('log', ['warn', 'error']);

  stream.on('data', function (file) {
    assert.equal(file.contents.toString(), 'function test(){void 0; } log.error("Error"); function test(){window.log.warn("foo"); if(console){void 0;}}');
    cb();
  });

  stream.write(new gutil.File({
    contents: new Buffer('function test(){alert(1); debugger;} log.error("Error"); function test(){window.log.warn("foo"); if(console){log.debug("foo", "bar");}}')
  }));
});

