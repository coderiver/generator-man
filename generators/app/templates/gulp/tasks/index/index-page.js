var gulp        = require('gulp');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');
require('require-yaml');

gulp.task('list-pages', function() {
    pages = require('../../../' + config.src.pagelist);
    return gulp
        .src(__dirname + '/pages.html')
        .pipe(consolidate('lodash', {
            pages: pages
        }))
        .pipe(gulp.dest(config.dest.html));
});
