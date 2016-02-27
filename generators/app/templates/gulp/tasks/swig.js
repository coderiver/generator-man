var gulp        = require('gulp');
var swig        = require('gulp-swig');
var plumber     = require('gulp-plumber');
var gulpif      = require('gulp-if');
var changed     = require('gulp-changed');
var prettify    = require('gulp-prettify');
var frontMatter = require('gulp-front-matter');
var config      = require('../config');

function renderHtml(onlyChanged) {
    return gulp
        .src([config.src.templates + '/**/[^_]*.html'])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(swig({
            load_json: true,
            json_path: config.src.templatesData,
            defaults: {
                cache: false
            }
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: true,
            // unformatted: [],
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('swig', function() {
    return renderHtml();
});

gulp.task('swig:changed', function() {
    return renderHtml(true);
});

gulp.task('swig:watch',  function() {
    gulp.watch([
        config.src.templates + '/**/[^_]*.html'
    ], ['swig:changed']);

    gulp.watch([
        config.src.templates + '/**/_*.html',
        config.src.templatesData + '/*.json'
    ], ['swig']);
});
