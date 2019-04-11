import gulp from 'gulp';
import config from './gulp/config';

const getTaskBuild = task => require('./gulp/tasks/' + task).build(gulp);
const getTaskWatch = task => require('./gulp/tasks/' + task).watch(gulp);

gulp.task('clean', getTaskBuild('clean'));
gulp.task('copy', getTaskBuild('copy'));
gulp.task('server', () => getTaskBuild('server'));<% if (templates === 'nunjucks') { %>
gulp.task('nunjucks', () => getTaskBuild('nunjucks'));<% } %><% if (templates === 'pug') { %>
gulp.task('pug', () => getTaskBuild('pug'));<% } %><% if (css === 'sass') { %>
gulp.task('sass', () => getTaskBuild('sass'));<% } %><% if (sprites.indexOf('svg') !== -1) { %>
gulp.task('sprite:svg', () => getTaskBuild('sprite-svg'));<% } %><% if (svgo) { %>
gulp.task('svgo', () => getTaskBuild('svgo'));<% } %><% if (preview) { %>
gulp.task('list-pages', getTaskBuild('list-pages'));<% } %>
gulp.task('webpack', getTaskBuild('webpack'));

gulp.task('copy:watch', getTaskWatch('copy'));<% if (templates === 'nunjucks') { %>
gulp.task('nunjucks:watch', getTaskWatch('nunjucks'));<% } %><% if (templates === 'pug') { %>
gulp.task('pug:watch', getTaskWatch('pug'));<% } %><% if (css === 'sass') { %>
gulp.task('sass:watch', getTaskWatch('sass'));<% } %><% if (sprites.indexOf('svg') !== -1) { %>
gulp.task('sprite:svg:watch', getTaskWatch('sprite-svg'));<% } %><% if (svgo) { %>
gulp.task('svgo:watch', getTaskWatch('svgo'));<% } %><% if (preview) { %>
gulp.task('list-pages:watch', getTaskWatch('list-pages'));<% } %>
gulp.task('webpack:watch', getTaskWatch('webpack'));

const setmodeProd = done => {
  config.setEnv('production');
  config.logEnv();
  done();
}

const setmodeDev = done => {
  config.setEnv('development');
  config.logEnv();
  done();
}

gulp.task(
  'build',
  gulp.series(
    setmodeProd,
    'clean',<% if (sprites.indexOf('svg') !== -1) { %>
    'sprite:svg',<% } %><% if (svgo) { %>
    'svgo',<% } %><% if (css === 'sass') { %>
    'sass',<% } %><% if (templates === 'nunjucks') { %>
    'nunjucks',<% } %><% if (templates === 'pug') { %>
    'pug',<% } %>
    'webpack',<% if (preview) { %>
    'list-pages',<% } %>
    'copy'
  )
);

gulp.task(
  'build:dev',
  gulp.series(
    setmodeDev,
    'clean',<% if (sprites.indexOf('svg') !== -1) { %>
    'sprite:svg',<% } %><% if (svgo) { %>
    'svgo',<% } %><% if (css === 'sass') { %>
    'sass',<% } %><% if (templates === 'nunjucks') { %>
    'nunjucks',<% } %><% if (templates === 'pug') { %>
    'pug',<% } %>
    'webpack',<% if (preview) { %>
    'list-pages',<% } %>
    'copy'
  )
);

gulp.task(
  'watch',
  gulp.parallel(
    'copy:watch',<% if (templates === 'nunjucks') { %>
    'nunjucks:watch',<% } %><% if (templates === 'pug') { %>
    'pug:watch',<% } %><% if (sprites.indexOf('svg') !== -1) { %>
    'sprite:svg:watch',<% } %><% if (svgo) { %>
    'svgo:watch',<% } %><% if (preview) { %>
    'list-pages:watch',<% } %>
    'webpack:watch',<% if (css === 'sass') { %>
    'sass:watch'<% } %>
  )
);

gulp.task('default', gulp.series(['build:dev', 'server', 'watch']));
