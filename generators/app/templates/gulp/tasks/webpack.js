import webpack from 'webpack';
import gutil from 'gulp-util';
import notify from 'gulp-notify';
import server from './server';
import config from '../config';
var webpackConfig = require('../../webpack.config').createConfig(config.env);

const handler = (err, stats, cb) => {
        const { errors } = stats.compilation;
        
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
                chunks: false,
                errors: false
        }));
        
    server.server.reload();
    if (typeof cb === 'function') cb();
}

const webpackPromise = () => new Promise(resolve => webpack(webpackConfig, (err, stats) => handler(err, stats, resolve)));
const webpackPromiseWatch = () => new Promise(resolve => webpack(webpackConfig).watch({
        aggregateTimeout: 100,
        poll: false
    }, handler));

const build = gulp => gulp.series(webpackPromise);
const watch = gulp => gulp.series(webpackPromiseWatch);
// const watch = gulp => () => gulp.watch(config.src.js + '/**/*', gulp.parallel('webpack', webpackPromise));

module.exports.build = build;
module.exports.watch = watch;