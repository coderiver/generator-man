var gulp        = require('gulp');
var config      = require('../config');
var htmlhint    = require('gulp-htmlhint');
var gitStaged   = require("gulp-git-staged");
var sassLint    = require('gulp-sass-lint')


gulp.task('lint:js', function() {
  // return gulp.src(['src/js/**/*.js', '!node_modules/**'])
  //   .pipe(eslint())
  //   .pipe(eslint.format())
  //   .pipe(eslint.failAfterError());
});

gulp.task('lint:html', function() {
  return gulp.src(config.dest.html + "/*.html")
  	.pipe(gitStaged())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});

gulp.task('lint:sass', function() {
  return gulp.src('src/sass/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('lint', [
    'lint:sass',
    'lint:html'
]);