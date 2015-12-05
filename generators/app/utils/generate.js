'use strict';

var _ = require('lodash');

var helpers = {
  copy: function (template, destination, context) {
    if (context && Object.keys(context).length) {
      context._ = {
        kebabCase: _.kebabCase,
        camelCase: _.camelCase,
        capitalize: _.capitalize
      };

      this.fs.copyTpl(this.templatePath(template), this.destinationPath(destination), context);
    } else {
      this.fs.copy(this.templatePath(template), this.destinationPath(destination));
    }
  }
};

var generate = {
  config: function () {
    this.config.set('config', this.prompts);
  },

  dotfiles: function () {
    // helpers.copy.call(this, 'bowerrc', '.bowerrc');
    // helpers.copy.call(this, 'editorconfig', '.editorconfig');
    // helpers.copy.call(this, 'gitattributes', '.gitattributes');
    // helpers.copy.call(this, 'jshintrc', '.jshintrc');
    helpers.copy.call(this, 'gulpfile.js', 'gulpfile.js', this.prompts);
    helpers.copy.call(this, '_gitignore', '.gitignore');
  },

  appfiles: function () {
    helpers.copy.call(this, '_package.json', 'package.json', this.prompts);
    // helpers.copy.call(this, '_bower.json', 'bower.json', this.prompts);
  },

  gulpModules: function () {
    helpers.copy.call(this, 'gulpfile.js', 'gulpfile.js', this.prompts);
    helpers.copy.call(this, 'gulp/config.js', 'gulp/config.js', this.prompts);
    helpers.copy.call(this, 'gulp/helpers/_svgfont.sass', 'gulp/helpers/_svgfont.sass');
    helpers.copy.call(this, 'gulp/helpers/icons.html', 'gulp/helpers/icons.html');
    helpers.copy.call(this, 'gulp/helpers/sprite.template.mustache', 'gulp/helpers/sprite.template.mustache');


    var pkg = ['sass','iconfont','copy', 'html','jade','spritesmith','watch', 'js','server'];
    var arrayLength = pkg.length;
    var p,f;

    for (var i = 0; i < arrayLength; i++) {
      f = 'gulp/tasks/' + pkg[i] + '.js';
      helpers.copy.call(this, f, f, this.prompts);
    }
  },

  projectInfo: function () {
    // helpers.copy.call(this, '_index.html', 'index.html', this.prompts);
    helpers.copy.call(this, 'README.md', 'README.md', this.prompts);
  }

  // assets: function () {
  //   helpers.copy.call(this, 'src/img/.keep', 'src/fonts/.keep');
  //   helpers.copy.call(this, 'src/img/.keep', 'src/img/.keep');
  //   helpers.copy.call(this, 'src/img/.keep', 'src/media/.keep');
  // },

  // templateFiles: function () {
  //   helpers.copy.call(this, 'src/_template.html', 'src/template.' + this.prompts.extension, this.prompts);

  //   helpers.copy.call(this, 'src/includes/_head.html', 'src/includes/head.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_header.html', 'src/includes/header.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_sidebar.html', 'src/includes/sidebar.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_footer.html', 'src/includes/footer.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_scripts.html', 'src/includes/scripts.' + this.prompts.extension, this.prompts);
  // },

  // preprocessor: function (type, underscore) {
  //   helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().default, 'src/' + this.prompts.cssPreprocessor);
  // },

  // js: function () {
  //   helpers.copy.call(this, 'src/js/_main.js', 'src/js/main.js', this.prompts);
  // },

  // wp: function () {
  //   this.fs.write(this.destinationPath(this.prompts.wpThemeFolder + '/.keep'), '');
  //   helpers.copy.call(this, 'src/_wp.html', 'src/wp.' + this.prompts.extension, this.prompts);

  //   helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().wp, 'src/' + this.prompts.cssPreprocessor);
  // },

  // sprites: function () {
  //   helpers.copy.call(this, 'src/img/.keep', 'src/img/sprites/1x/.keep');
  //   helpers.copy.call(this, 'src/img/.keep', 'src/img/sprites/2x/.keep');

  //   helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().sprites, 'src/' + this.prompts.cssPreprocessor);
  // },

  // bootstrap: function () {
  //   helpers.copy.call(this, 'src/_bootstrap.html', 'src/bootstrap.' + this.prompts.extension, this.prompts);

  //   helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().bootstrap, 'src/' + this.prompts.cssPreprocessor);
  // },

  // icomoon: function () {
  //   helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().icomoon, 'src/' + this.prompts.cssPreprocessor);
  // },

  // browserify: function () {
  //   helpers.copy.call(this, 'src/js/modules/_exampleFn.js', 'src/js/modules/exampleFn.js', this.prompts);

  //   helpers.createStructure.bind(this)(helpers.getStructure.bind(this)().browserify, 'src/js/');
  // }
};

module.exports = generate;
