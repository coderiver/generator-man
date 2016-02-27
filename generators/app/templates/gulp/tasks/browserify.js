var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var util        = require('gulp-util');
var filter      = require('gulp-filter');
var sourcemaps  = require('gulp-sourcemaps');
var size        = require('gulp-size');
var gulpif      = require('gulp-if');
var path        = require('path');
var browserSync = require('browser-sync');
var config      = require('../config');

var appBundleName = 'app.js';

var props = {
    dest: [config.dest.js],
    entries: path.join(config.src.js, 'app.js'),
    transform: [],
    noParse: ['jquery'],
    extensions: ['.js'],
    debug: true,
    cache: {},
    packageCache: {}
};

function bundle(bundler, outputName) {
    return bundler
        .bundle()
        .on('error', config.errorHandler)
        .pipe(source(outputName))
        .pipe(buffer())
        .pipe(gulpif(config.production, size()))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif(config.production, uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(gulpif(config.production, filter(['*.js'])))
        .pipe(gulpif(config.production, size()))
        .pipe(browserSync.reload());
}

gulp.task('browserify', function() {
    var bundler = browserify(props);
    return bundle(bundler, appBundleName);
});

gulp.task('browserify:watch', function() {
    var bundler = watchify(browserify(props));
    bundler.on('log', util.log);
    bundler.on('update', function() {
        bundle(bundler, appBundleName);
    });
    return bundle(bundler, appBundleName);
});
