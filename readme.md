# [gulp](https://github.com/wearefractal/gulp)-strip-debug-arbitrary


> Strip `alert`, `debugger` and arbitrary statements (e.g. `console` with property whitelist) from JavaScript code with [strip-debug-arbitrary](https://github.com/berstend/strip-debug-arbitrary)


## Install

```sh
$ npm install --save berstend/gulp-strip-debug-arbitrary
```


## Usage

```js
var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug-arbitrary');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(stripDebug())
		.pipe(gulp.dest('dist'));
});
```

## API

By default `alert`, and `debugger` statements are being stripped and without additional parameters all `console` statements as well.
The latter can be overwritten by adding some parameters to the `stripDebug()` method.
Stripped means the statements are replaced by `void 0` which UglifyJS can later remove altogether.

## stripDebug(id, whitelist)

### id

Type: `string`
Default: `console`
Optional: Pass the name of the statement to remove (e.g. "log"), if none is given "console" is being used.


### whitelist

Type: `array`
Default: `[]`
Optional: Pass an array of properties to exclude (e.g. ["warn", "error"])



## License

MIT © [Sindre Sorhus](http://sindresorhus.com) & berstend
