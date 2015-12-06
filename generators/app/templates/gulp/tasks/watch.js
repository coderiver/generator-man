var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');

gulp.task('watch', [
    'sprite:watch',
    'sass:watch',
    'copy:watch',
    'html:watch',
    <% if (jade) { %>'jade:watch', <% } %>
    'font:watch',
    'js:watch'
]);


gulp.task('delete', function (cb) {
    rimraf('./'+config.dest.root, cb);
});
gulp.task('default', ['server', 'watch'], function() {});
gulp.task('build', [
	'html',
	<% if (jade) { %>'jade',<% } %>
	<% if (iconfont) { %>'font',<% } %>
	'sprite',
	'copy',
	'js',
	'sass'
	], function() {});