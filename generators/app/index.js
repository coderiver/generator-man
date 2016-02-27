'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var prompts = require('./prompts');
var writeFiles = require('./writing');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the first-rate ' + chalk.red('generator-man') + ' generator!'
    ));

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    writeFiles.call(this);
  },

  install: function () {
    if (this.props.install) {
      this.installDependencies();
    } else {
      this.log('Run ' + chalk.blue('npm install') + ' to install dependencies later');
    }
  },

  end: function () {
    this.log(chalk.green('Done!'));
  }
});
