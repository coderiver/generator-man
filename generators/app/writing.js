'use strict';

var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = function () {
  var props = this.props;
  var destPath = this.destinationPath();

  props._ = {
    kebabCase: _.kebabCase,
    camelCase: _.camelCase,
    capitalize: _.capitalize
  };

  // create directories
  mkdirp(path.join(destPath, 'src/fonts'));
  mkdirp(path.join(destPath, 'src/img'));

  // dotfiles
  this.copy('gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('eslintrc', '.eslintrc');
  this.copy('gulpfile.js');
  this.template('package.json', props);

  // gulp configs
  this.copy('gulp/config.js');
  this.bulkDirectory('gulp/util', 'gulp/util');

  // common tasks
  this.template('gulp/tasks/default.js');
  this.template('gulp/tasks/build.js', props);
  this.template('gulp/tasks/watch.js', props);
  this.template('gulp/tasks/copy.js', props);
  this.copy('gulp/tasks/clean.js');
  this.copy('gulp/tasks/server.js');
  this.copy('gulp/tasks/sass.js');
  this.bulkDirectory('gulp/tasks/index-page', 'gulp/tasks/index-page');

  // compile templates tasks
  switch (props.templates) {
    case 'nunjucks':
      this.copy('gulp/tasks/nunjucks.js');
      break;
    case 'swig':
      this.copy('gulp/tasks/swig.js');
      break;
    case 'jade':
      this.copy('gulp/tasks/jade.js');
      break;
  }

  // image optimization task
  if (props.imagemin) {
    this.copy('gulp/tasks/imagemin.js');
  }

  if (props.svgo) {
    this.copy('gulp/tasks/svgo.js');
    this.directory('src/img/svgo', 'src/img/svgo');
  }

  if (props.sprites.length) {
    this.directory('src/icons', 'src/icons');
  }

  // iconfont task
  if (props.sprites.indexOf('iconfont') !== -1) {
    this.bulkDirectory('gulp/tasks/iconfont', 'gulp/tasks/iconfont');
  }

  // svg sprites task
  if (props.sprites.indexOf('svg') !== -1) {
    this.bulkDirectory('gulp/tasks/sprite-svg', 'gulp/tasks/sprite-svg');
  }

  // png sprites task
  if (props.sprites.indexOf('png') !== -1) {
    this.bulkDirectory('gulp/tasks/sprite-png', 'gulp/tasks/sprite-png');
  }

  // js bundler task
  if (props.bundler === 'browserify') {
    this.copy('gulp/tasks/browserify.js');
  }

  if (props.bundler === 'webpack') {
    this.copy('gulp/tasks/webpack.js');
    this.copy('webpack.config.js');
    this.copy('babelrc', '.babelrc');
  }

  // copy directories
  this.directory('src/js', 'src/js');
  this.sprites = props.sprites; // or in /templates/src/sass/app.sass use options.sprites
  this.directory('src/sass', 'src/sass');

  switch (props.templates) {
    case 'nunjucks':
      this.directory('src/templates-nunjucks', 'src/templates');
      break;
    case 'swig':
      this.directory('src/templates-swig', 'src/templates');
      break;
    case 'jade':
      this.directory('src/templates-jade', 'src/templates');
      break;
  }
};
