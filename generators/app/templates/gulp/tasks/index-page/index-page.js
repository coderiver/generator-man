var gulp        = require('gulp');
var consolidate = require('gulp-consolidate');
var fs          = require('fs');
var path        = require('path');
var config      = require('../../config');
var allowExt    = ['.html', '.jade'];

gulp.task('index-page', function() {
    var fullList = fs.readdirSync(config.src.templates);
    var pages = fullList.reduce(function(acc, val) {
        var parsed = path.parse(val);
        var name = parsed.name;
        var ext = parsed.ext;
        if (~allowExt.indexOf(ext)) {
            return acc.concat(name + '.html');
        }
        return acc;
    }, []);

    return gulp
        .src(__dirname + '/__index.html')
        .pipe(consolidate('lodash', {
            pages: pages
        }))
        .pipe(gulp.dest(config.src.root));
});
