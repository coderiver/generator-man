'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();


    this.log('');
    this.log(chalk.cyan(' ***********************************************************') + '\n');
    this.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' Coderiver Generator ') + '\n');
    this.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n');
    this.log(chalk.cyan(' ***********************************************************') + '\n');


    var prompts = [{
      type: 'confirm',
      name: 'spritesmith',
      message: 'Do you want sass sprites?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {
        spritesmith: true
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
