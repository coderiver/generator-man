var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',
    <% if (templates === 'swig') { %>
    'swig:watch',<% } %><% if (templates === 'jade') { %>
    'jade:watch',<% } %><% if (templates === 'nunjucks') { %>
    'nunjucks:watch',<% } %><% if (sprites.indexOf('iconfont') !== -1) { %>
    'iconfont:watch',<% } %><% if (sprites.indexOf('svg') !== -1) { %>
    'sprite:svg:watch',<% } %><% if (sprites.indexOf('png') !== -1) { %>
    'sprite:png:watch',<% } %><% if (svgo) { %>
    'svgo:watch',<% } %><% if (bundler === 'browserify') { %>
    'browserify:watch',<% } %><% if (bundler === 'webpack') { %>
    'webpack:watch',<% } %><% if (bundler === 'manually') { %>
    'js:watch',<% } %><% if (css === 'sass') { %>
    'sass:watch'<% } %><% if (css === 'postcss') { %>
    'sss:watch'<% } %>
]);
