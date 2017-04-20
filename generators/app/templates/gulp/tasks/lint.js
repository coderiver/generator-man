var gulp        = require('gulp');
var config      = require('../config');
var htmlhint    = require('gulp-htmlhint');
var gitStaged   = require("gulp-git-staged");
var sassLint    = require('gulp-sass-lint')
<% if (prettify) { %>var prettier    = require('gulp-prettier');<% } %>
var git         = require('gulp-git');


gulp.task('lint:js', function() {
  // return gulp.src(['src/js/**/*.js', '!node_modules/**'])
  //   .pipe(eslint())
  //   .pipe(eslint.format())
  //   .pipe(eslint.failAfterError());
});
<% if (prettify) { %>
gulp.task('prettier', function() {
  return gulp.src(['src/js/**/*.js'])
    .pipe(gitStaged())
    .pipe(prettier())
    .pipe(gulp.dest('src/js/'))
    .pipe(git.add({args: '-u'}))
});
<% } %>

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
    <% if (prettify) { %>
    'prettier',
    <% } %>
    'lint:sass',
    'lint:html'
]);