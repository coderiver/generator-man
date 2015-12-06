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
    helpers.copy.call(this, 'bowerrc', '.bowerrc');
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
    
    


    var taskslist = ['sass','iconfont','copy', 'html','jade','spritesmith','watch', 'js','server'];
    var arrayLength = taskslist.length;
    var p,f;

    for (var i = 0; i < arrayLength; i++) {
      f = 'gulp/tasks/' + taskslist[i] + '.js';
      helpers.copy.call(this, f, f, this.prompts);
    }
  },

  spritesmith: function () {
    helpers.copy.call(this, 'gulp/helpers/sprite.template.mustache', 'gulp/helpers/sprite.template.mustache');
  },

  iconfont: function () {
    helpers.copy.call(this, 'gulp/helpers/_svgfont.sass', 'gulp/helpers/_svgfont.sass');
    helpers.copy.call(this, 'gulp/helpers/icons.html', 'gulp/helpers/icons.html');
  },

  projectInfo: function () {
    // helpers.copy.call(this, '_index.html', 'index.html', this.prompts);
    helpers.copy.call(this, 'README.md', 'README.md', this.prompts);
  },

  assets: function () {
    helpers.copy.call(this, 'src/.keep', 'src/fonts/.keep');
    helpers.copy.call(this, 'src/.keep', 'src/img/.keep');
    helpers.copy.call(this, 'src/img/icons/coderiver.png', 'src/img/icons/coderiver.png');
    helpers.copy.call(this, 'src/img/svg/sepa.svg', 'src/img/svg/sepa.svg');
  },

  // templateFiles: function () {
  //   helpers.copy.call(this, 'src/_template.html', 'src/template.' + this.prompts.extension, this.prompts);

  //   helpers.copy.call(this, 'src/includes/_head.html', 'src/includes/head.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_header.html', 'src/includes/header.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_sidebar.html', 'src/includes/sidebar.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_footer.html', 'src/includes/footer.' + this.prompts.extension, this.prompts);
  //   helpers.copy.call(this, 'src/includes/_scripts.html', 'src/includes/scripts.' + this.prompts.extension, this.prompts);
  // },
  html: function (type, underscore) {
    helpers.copy.call(this, 'src/index.html', 'src/index.html', this.prompts);
    helpers.copy.call(this, 'src/partials/partial.html', 'src/partials/partial.html', this.prompts);
  },
  jade: function (type, underscore) {
    helpers.copy.call(this, 'src/jade/_layout.jade', 'src/jade/_layout.jade', this.prompts);
    helpers.copy.call(this, 'src/jade/index.jade', 'src/jade/index.jade', this.prompts);
  },
  sass: function (type, underscore) {
    helpers.copy.call(this, 'src/sass/style.sass', 'src/sass/style.sass', this.prompts);
    helpers.copy.call(this, 'src/sass/_common.sass', 'src/sass/_common.sass', this.prompts);
    helpers.copy.call(this, 'src/sass/_main.sass', 'src/sass/_main.sass', this.prompts);
    helpers.copy.call(this, 'src/sass/lib/_media.scss', 'src/sass/lib/_media.scss', this.prompts);
    helpers.copy.call(this, 'src/sass/lib/_mixins.sass', 'src/sass/lib/_mixins.sass', this.prompts);
    helpers.copy.call(this, 'src/sass/lib/_reset.sass', 'src/sass/lib/_reset.sass', this.prompts);
    helpers.copy.call(this, 'src/sass/lib/_slick.sass', 'src/sass/lib/_slick.sass', this.prompts);
  },

  js: function () {
    helpers.copy.call(this, 'src/js/app.js', 'src/js/app.js', this.prompts);
    helpers.copy.call(this, 'src/js/common.js', 'src/js/common.js', this.prompts);
    helpers.copy.call(this, 'src/js/lib/jquery.js', 'src/js/lib/jquery.js', this.prompts);
    helpers.copy.call(this, 'src/js/lib/slick.min.js', 'src/js/lib/slick.min.js', this.prompts);
  },

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
