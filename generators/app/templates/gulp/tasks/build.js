var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

function build(cb) {
    runSequence(
        'clean',<% if (sprites.indexOf('iconfont') !== -1) { %>
        'iconfont',<% } %><% if (sprites.indexOf('svg') !== -1) { %>
        'sprite:svg',<% } %><% if (sprites.indexOf('png') !== -1) { %>
        'sprite:png',<% } %><% if (imagemin) { %>
        'imagemin',<% } %><% if (svgo) { %>
        'svgo',<% } %>
        'sass',<% if (templates === 'swig') { %>
        'swig',<% } %><% if (templates === 'jade') { %>
        'jade',<% } %><% if (templates === 'nunjucks') { %>
        'nunjucks',<% } %><% if (bundler === 'browserify') { %>
        'browserify',<% } %><% if (bundler === 'webpack') { %>
        'webpack',<% } %>
        'copy',
        cb
    );
}

gulp.task('build', function(cb) {
    config.setEnv('production');
    config.logEnv();
    build(cb);
});

gulp.task('build:dev', function(cb) {
    config.setEnv('development');
    config.logEnv();
    build(cb);
});
