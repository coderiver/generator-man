var gulp        = require('gulp');
var config      = require('../config');
var htmlhint      = require('gulp-htmlhint');


gulp.task('lint:js', function() {
  // return gulp.src(['src/js/**/*.js', '!node_modules/**'])
  //   .pipe(eslint())
  //   .pipe(eslint.format())
  //   .pipe(eslint.failAfterError());
});

gulp.task('lint:html', function() {
  return gulp.src(config.dest.html + "/*.html")
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});

gulp.task('lint', [
    // 'lint:js',
    'lint:html'
]);