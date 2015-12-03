'use strict';

var _ = require('lodash');

module.exports = function (answers) {
  this.prompts                  = {};
  this.prompts.projectName      = answers.projectName;
  // this.prompts.authorName       = answers.useBranding ? 'XHTMLized' : answers.authorName;
  this.prompts.spritesmith      = answers.spritesmith;
  // this.prompts.reloader         = answers.reloader;
  // this.prompts.devServer        = answers.devServer;
  // this.prompts.cssPreprocessor  = answers.cssPreprocessor;
  // this.prompts.cssPrefix        = answers.cssPreprocessor === 'scss' ? '_' : '';
  // this.prompts.ignoreDist       = answers.ignoreDist;
  // this.prompts.isWP             = answers.isWP;
  // this.prompts.extension        = answers.extension;
  // this.prompts.proxy            = answers.proxy;
  this.prompts.features         = {};

  if (Array.isArray(answers.features)) {
    for (var i in answers.features) {
      this.prompts.features[answers.features[i]] = true;
    }
  } else if (typeof answers.features === 'object') {
    this.prompts.features = answers.features;
  }

  // if (this.prompts.isWP) {
  //   this.prompts.wpFolder       = 'wp';
  //   this.prompts.wpThemeFolder  = this.prompts.wpFolder + '/wp-content/themes/' + _.kebabCase(this.prompts.projectName);
  // }
};
