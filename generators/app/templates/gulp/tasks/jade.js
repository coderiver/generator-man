var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require("gulp-plumber");
var jade = require("gulp-jade");
var config = require('../config');
// var changed = require("gulp-changed");

gulp.task('jade', function() {
    return gulp.src([
            config.src.jade + '/*.jade', 
            '!' + config.src.jade + '/_*.jade', 
            '!' + config.src.jade + '/includes/*.jade'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        // .pipe(changed(dest.html, {extension: '.html'}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(config.dest.html));
});

//compile all jade files
gulp.task('jade-all', function() {
    return gulp.src([
        config.src.jade + '/*.jade', 
        '!' + config.src.jade + '/_*.jade', 
        '!' + config.src.jade + '/includes/*.jade'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(config.dest.html));
});

gulp.task('jade:watch', function() {
    gulp.watch(config.src.jade + '/**/*.jade', ['jade']);
    gulp.watch([config.src.jade + '/_*.jade', config.src.jade + '/includes/*.jade'], ['jade-all']);
});