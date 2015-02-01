'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var stripDebug = require('strip-debug-arbitrary');

module.exports = function (id, whitelist) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-strip-debug', 'Streaming not supported'));
      return;
    }

    try {
      file.contents = new Buffer(stripDebug(file.contents.toString(), id, whitelist).toString());
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-strip-debug', err, {fileName: file.path}));
    }

    cb();
  });
};
