var gulp        = require('gulp');
var jade        = require('gulp-jade');
var plumber     = require('gulp-plumber');
var changed     = require('gulp-changed');
var gulpif      = require('gulp-if');
var frontMatter = require('gulp-front-matter');
var prettify    = require('gulp-prettify');
var config      = require('../config');

function renderHtml(onlyChanged) {
    return gulp
        .src([config.src.templates + '/[^_]*.jade'])
        .pipe(plumber({ errorHandler: config.errorHandler }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(jade())
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: true,
            // unformatted: [],
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('jade', function() {
    return renderHtml();
});

gulp.task('jade:changed', function() {
    return renderHtml(true);
});

gulp.task('jade:watch', function() {
    gulp.watch([config.src.templates + '/**/_*.jade'], ['jade']);
    gulp.watch([config.src.templates + '/**/[^_]*.jade'], ['jade:changed']);
});
