'use strict';

var Gulp = require('gulp');
var GulpNSP = require('./index.js');

Gulp.task('nsp', function (cb) {

  GulpNSP({
    shrinkwrap: __dirname + '/npm-shrinkwrap.json',
    package: __dirname + '/package.json'
  }, cb);
});
