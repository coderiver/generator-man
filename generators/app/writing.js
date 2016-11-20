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
  this.copy('stylelintrc', '.stylelintrc');
  this.copy('gulpfile.js');
  this.copy('README.md');
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
  this.bulkDirectory('gulp/tasks/index-page', 'gulp/tasks/index-page');

  this.sprites = props.sprites; // or in /templates/src/sass/app.sass use options.sprites
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

  switch (props.css) {
    case 'sass':
      this.copy('gulp/tasks/sass.js');
      break;
    case 'postcss':
      this.copy('gulp/tasks/postcss.js');
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
  // if (props.sprites.indexOf('iconfont') !== -1) {
  //   this.bulkDirectory('gulp/tasks/iconfont', 'gulp/tasks/iconfont');
  // }
  if (props.sprites.indexOf('iconfont') !== -1) {
    this.template('gulp/tasks/iconfont/iconfont.js',props);

    switch (props.css) {
      case 'sass':
        this.bulkCopy('gulp/tasks/iconfont/_iconfont.scss','gulp/tasks/iconfont/_iconfont.scss');
        break;
      case 'postcss':
        this.bulkCopy('gulp/tasks/iconfont/_iconfont.sss','gulp/tasks/iconfont/_iconfont.sss');
        break;
    }
  }

  // svg sprites task
  if (props.sprites.indexOf('svg') !== -1) {
    this.template('gulp/tasks/sprite-svg/sprite-svg.js',props);

    switch (props.css) {
      case 'sass':
        this.bulkCopy('gulp/tasks/sprite-svg/_sprite-svg.scss','gulp/tasks/sprite-svg/_sprite-svg.scss');
        break;
      case 'postcss':
        this.bulkCopy('gulp/tasks/sprite-svg/_sprite-svg.sss','gulp/tasks/sprite-svg/_sprite-svg.sss');
        break;
    }
  }

  // png sprites task
  if (props.sprites.indexOf('png') !== -1) {
    this.template('gulp/tasks/sprite-png/sprite-png.js',props);

    switch (props.css) {
      case 'sass':
        this.template('gulp/tasks/sprite-png/sprite.template.mustache',props);
        break;
      case 'postcss':
        this.template('gulp/tasks/sprite-png/sprite.sss.template.mustache',props);
        break;
    }
  }



  // copy directories
  if (props.bundler === 'webpack') {
    this.copy('src/js/app-webpack.js', 'src/js/app.js');
  } else {
    this.bulkCopy('src/js/app.js', 'src/js/app.js');
    this.directory('src/js/lib/', 'src/js/lib/');
  }

  if (props.bundler === 'webpack') {
    this.bulkCopy('gulp/tasks/webpack.js', 'gulp/tasks/webpack.js');
    this.bulkCopy('src/js/lib/sayHello-webpack.js', 'src/js/lib/sayHello.js');
    this.copy('webpack.config.js');
  }
  else{
    this.bulkCopy('gulp/tasks/js.js', 'gulp/tasks/js.js');
    this.bulkCopy('src/js/lib/sayHello.js', 'src/js/lib/sayHello.js');
  }
  this.copy('babelrc', '.babelrc');

  if (props.css === 'sass') {
    this.directory('src/sass', 'src/sass');
  } else{
    this.directory('src/postcss', 'src/sass');
  }

  


  
  

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
