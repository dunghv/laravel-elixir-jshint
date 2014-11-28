'use strict';

var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    elixir = require('laravel-elixir');

elixir.extend('jshint', function (src, options) {
  src = src || [
    'public/js/**/*.js',
    '!public/js/vendor/**/*.js'
  ];

  options = options || {};

  var onError = function (err) {
    notify.onError({
      title: 'Laravel Elixir',
      subtitle: 'JSHint failed.',
      message: '<%= error.message %>',
      icon: __dirname + '/../laravel-elixir/icons/fail.png'
    })(err);

    this.emit('end');
  };

  gulp.task('jshint', function () {
    return gulp.src(src)
      .pipe(jshint(options))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
      .on('error', onError)
      .pipe(notify({
        title: 'Laravel Elixir',
        subtitle: 'JSHint passed.',
        message: ' ',
        icon: __dirname + '/../laravel-elixir/icons/pass.png'
      }));
  });

  this.registerWatcher('jshint', src);

  return this.queueTask('jshint');
});
