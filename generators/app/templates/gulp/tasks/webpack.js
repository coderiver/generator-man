var gulp          = require('gulp');
var webpack       = require('webpack');
var gutil         = require('gulp-util');
var notify        = require('gulp-notify');
var server        = require('./server');
var config        = require('../config');
var webpackConfig = require('../../webpack.config').createConfig;

function handler(err, stats, cb) {
    var errors = stats.compilation.errors;

    if (err) throw new gutil.PluginError('webpack', err);

    if (errors.length > 0) {
        notify.onError({
            title: 'Webpack Error',
            message: '<%= error.message %>',
            sound: 'Submarine'
        }).call(null, errors[0]);
    }

    gutil.log('[webpack]', stats.toString({
        colors: true,
        chunks: false
    }));

    server.reload();
    if (typeof cb === 'function') cb();
}

gulp.task('webpack', function(cb) {
    webpack(webpackConfig(config.env)).run(function(err, stats) {
        handler(err, stats, cb);
    });
});

gulp.task('webpack:watch', function() {
    webpack(webpackConfig(config.env)).watch({
        aggregateTimeout: 100,
        poll: false
    }, handler);
});
