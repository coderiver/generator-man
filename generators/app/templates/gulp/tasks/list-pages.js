import gulp from 'gulp';
import consolidate from 'gulp-consolidate';
import config from '../config';

import 'require-yaml';

gulp.task('list-pages', function() {
  delete require.cache[require.resolve('../../' + config.src.pagelist)]
    const pages = require('../../' + config.src.pagelist);
    return gulp
      .src(__dirname + '/index/index.html')
      .pipe(consolidate('lodash', {
        pages: pages
      }))
      .pipe(gulp.dest(config.dest.html));
});

const build = gulp => gulp.parallel('list-pages');
const watch = gulp => () => gulp.watch(config.src.root+'/*', gulp.series('list-pages'));

module.exports.build = build;
module.exports.watch = watch;
