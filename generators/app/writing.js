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
  this.fs.copy(this.templatePath('gitignore'), '.gitignore');
  this.fs.copy(this.templatePath('editorconfig'), '.editorconfig');
  this.fs.copy(this.templatePath('eslintrc'), '.eslintrc');
  this.fs.copy(this.templatePath('eslintignore'), '.eslintignore');
  this.fs.copy(this.templatePath('htmlhintrc'), '.htmlhintrc');
  this.fs.copy(this.templatePath('sass-lint.yml'), '.sass-lint.yml');
  this.fs.copy(this.templatePath('stylelintrc'), '.stylelintrc');
  this.fs.copyTpl(this.templatePath('gulpfile.babel.js'), 'gulpfile.babel.js', props);
  this.fs.copy(this.templatePath('README.md'),'README.md');
  this.fs.copyTpl(this.templatePath('package.json'),'package.json', props);

  // gulp configs
  this.fs.copy(this.templatePath('gulp/config.js'),'gulp/config.js');
  this.fs.copy(this.templatePath('gulp/util/handle-errors.js'),'gulp/util/handle-errors.js');
  
  // common tasks
  // this.fs.copyTpl(this.templatePath('gulp/tasks/default.js'),'gulp/tasks/default.js');
  // this.fs.copyTpl(this.templatePath('gulp/tasks/build.js'),'gulp/tasks/build.js', props);
  // this.fs.copyTpl(this.templatePath('gulp/tasks/watch.js'),'gulp/tasks/watch.js', props);

  this.fs.copyTpl(this.templatePath('gulp/tasks/copy.js'),'gulp/tasks/copy.js', props);
  this.fs.copy(this.templatePath('gulp/tasks/clean.js'),'gulp/tasks/clean.js');
  this.fs.copy(this.templatePath('gulp/tasks/server.js'),'gulp/tasks/server.js');
  
  if(props.preview){
    this.fs.copy(this.templatePath('gulp/tasks/index/index.html'),'gulp/tasks/index/index.html');
    this.fs.copy(this.templatePath('gulp/tasks/list-pages.js'),'gulp/tasks/list-pages.js');
  }


  this.sprites = props.sprites; // or in /templates/src/sass/app.sass use options.sprites
  // compile templates tasks
  switch (props.templates) {
    case 'nunjucks':
      this.fs.copy(this.templatePath('gulp/tasks/nunjucks.js'),'gulp/tasks/nunjucks.js');
      break;
    // case 'swig':
    //   this.fs.copy(this.templatePath('gulp/tasks/swig.js'),'gulp/tasks/swig.js');
    //   break;
    // case 'jade':
    //   this.fs.copy(this.templatePath('gulp/tasks/jade.js'),'gulp/tasks/jade.js');
    //   break;
    case 'pug':
      this.fs.copy(this.templatePath('gulp/tasks/pug.js'),'gulp/tasks/pug.js');
      break;
  }

  switch (props.css) {
    case 'sass':
      this.fs.copy(this.templatePath('gulp/tasks/sass.js'),'gulp/tasks/sass.js');
      break;
    case 'postcss':
      this.fs.copy(this.templatePath('gulp/tasks/postcss.js'),'gulp/tasks/postcss.js');
      break;
  }

  // image optimization task
  if (props.imagemin) {
    this.fs.copy(this.templatePath('gulp/tasks/imagemin.js'),'gulp/tasks/imagemin.js');
  }

  this.fs.copy(this.templatePath('gulp/tasks/svgo.js'),'gulp/tasks/svgo.js');
  if (props.svgo) {
    this.fs.copy(this.templatePath('src/img/svgo/facebook.svg'),'src/img/svgo/facebook.svg');
    this.fs.copy(this.templatePath('src/img/svgo'), 'src/img/svgo');
  }

  if (props.sprites.length) {
    this.fs.copy(this.templatePath('src/icons/facebook.png'), 'src/icons/facebook.png');
    this.fs.copy(this.templatePath('src/icons/facebook.svg'), 'src/icons/facebook.svg');
    this.fs.copy(this.templatePath('src/icons/facebook@2x.png'), 'src/icons/facebook@2x.png');
  }

  // iconfont task

  if (props.sprites.indexOf('iconfont') !== -1) {
    this.fs.copy(this.templatePath('gulp/tasks/iconfont/iconfont.js'),'gulp/tasks/iconfont/iconfont.js');
    this.fs.copy(this.templatePath('gulp/tasks/iconfont/iconfont.html'),'gulp/tasks/iconfont/iconfont.html');

    switch (props.css) {
      case 'sass':
        this.fs.copy(this.templatePath('gulp/tasks/iconfont/_iconfont.scss'),'gulp/tasks/iconfont/_iconfont.scss');
        break;
      case 'postcss':
        this.fs.copy(this.templatePath('gulp/tasks/iconfont/_iconfont.sss'),'gulp/tasks/iconfont/_iconfont.sss');
        break;
    }
  }

  // svg sprites task

    this.fs.copyTpl(this.templatePath('gulp/tasks/sprite-svg.js'),'gulp/tasks/sprite-svg.js',props);

    switch (props.css) {
      case 'sass':
        this.fs.copy(this.templatePath('gulp/tasks/sprite-svg/_sprite-svg.scss'),'gulp/tasks/sprite-svg/_sprite-svg.scss');
        break;
      case 'postcss':
        this.fs.copy(this.templatePath('gulp/tasks/sprite-svg/_sprite-svg.sss'),'gulp/tasks/sprite-svg/_sprite-svg.sss');
        break;
    }
  

  // png sprites task
  if (props.sprites.indexOf('png') !== -1) {
    this.fs.copyTpl(this.templatePath('gulp/tasks/sprite-png/sprite-png.js'),'gulp/tasks/sprite-png/sprite-png.js',props);

    switch (props.css) {
      case 'sass':
        this.fs.copyTpl(this.templatePath('gulp/tasks/sprite-png/sprite.template.mustache'),'gulp/tasks/sprite-png/sprite.template.mustache',props);
        break;
      case 'postcss':
        this.fs.copyTpl(this.templatePath('gulp/tasks/sprite-png/sprite.sss.template.mustache'),'gulp/tasks/sprite-png/sprite.sss.template.mustache',props);
        break;
    }
  }

  if(props.preview){
    this.fs.copyTpl(this.templatePath('src/index.yaml'),'src/index.yaml', props);
  }
  
  // copy directories
  // if (props.bundler === 'webpack') {
    this.fs.copy(this.templatePath('src/js/app-webpack.js'), 'src/js/app.js');
  // } else {
  //   this.fs.copy(this.templatePath('src/js/app.js'), 'src/js/app.js');
  //   this.fs.copy(this.templatePath('src/js/lib'), 'src/js/lib')

  // }

  // if (props.bundler === 'webpack') {
    this.fs.copy(this.templatePath('gulp/tasks/webpack.js'), 'gulp/tasks/webpack.js');
    this.fs.copy(this.templatePath('src/js/lib/sayHello-webpack.js'), 'src/js/lib/sayHello.js');
    this.fs.copy(this.templatePath('src/js/lib/detectTouch-webpack.js'), 'src/js/lib/detectTouch.js');
    this.fs.copy(this.templatePath('webpack.config.js'),'webpack.config.js');
  // }
  // else{
  //   this.fs.copy(this.templatePath('gulp/tasks/js.js'), 'gulp/tasks/js.js');
  //   this.fs.copy(this.templatePath('src/js/lib/sayHello.js'), 'src/js/lib/sayHello.js');
  //   this.fs.copy(this.templatePath('src/js/lib/detectTouch.js'), 'src/js/lib/detectTouch.js');
  // }
  this.fs.copy(this.templatePath('babelrc'), '.babelrc');

  if (props.css === 'sass') {
    // this.directory('src/sass', 'src/sass');
    this.fs.copy(this.templatePath('src/sass'), 'src/sass');
    this.fs.copyTpl(this.templatePath('src/sass/app.sass'), 'src/sass/app.sass',props);
  } else{
    this.fs.copy(this.templatePath('src/postcss'), 'src/sass');
    this.fs.copyTpl(this.templatePath('src/sass/app.sss'), 'src/sass/app.sss',props);
  }


  switch (props.templates) {
    case 'nunjucks':
      this.fs.copy(this.templatePath('src/templates-nunjucks'), 'src/templates');
      if(!props.preview){
        this.fs.delete('src/templates/page.html');
        this.fs.copy(this.templatePath('src/templates-nunjucks/page.html'), 'src/templates/index.html');
      }
      break;
    case 'pug':
      this.fs.copy(this.templatePath('src/templates-pug'), 'src/templates');
      if(!props.preview){
        this.fs.delete('src/templates/page.pug');
        this.fs.copy(this.templatePath('src/templates-pug/page.pug'), 'src/templates/index.pug');
      }
      break;
    case 'swig':
      this.fs.copy(this.templatePath('src/templates-swig'), 'src/templates');
      break;
    case 'jade':
      this.fs.copy(this.templatePath('src/templates-jade'), 'src/templates');
      break;
    case 'html':
      this.fs.copy(this.templatePath('src/templates-html'), 'src');
      break;
  }
};
