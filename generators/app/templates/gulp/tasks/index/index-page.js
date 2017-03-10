var gulp        = require('gulp');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');
require('require-yaml');

gulp.task('list-pages', function() {
	delete require.cache[require.resolve('../../../' + config.src.pagelist)]
    var pages = require('../../../' + config.src.pagelist);
    return gulp
        .src(__dirname + '/index.html')
        .pipe(consolidate('lodash', {
            pages: pages
        }))
        .pipe(gulp.dest(config.dest.html));
});

gulp.task('list-pages:watch', function() {
    gulp.watch(config.src.root+'/*', ['list-pages']);
});

