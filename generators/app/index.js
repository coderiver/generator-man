'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var prompts = require('./prompts');
var writeFiles = require('./writing');

module.exports = class extends Generator {
  constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);

      // Next, add your custom code
      this.option('babel'); // This method adds support for a `--babel` flag
  }
  prompting() {
    // var done = this.async();

    this.log(yosay(
      'Welcome to the first-rate ' + chalk.red('generator-man') + ' generator!'
    ));

    // return this.prompt(prompts, function (props) {
    //   this.props = props;
    //   // done();
    // }.bind(this));

    return this.prompt(prompts).then((props)=>{
      this.props = props;
    })
  }

  writing () {

    console.log(writeFiles,'WRITE');
    writeFiles.call(this);
    // writeFiles();
  }

  install () {
    if (this.props.install) {
      this.installDependencies({
        bower: false,
        npm: true
      });
    } else {
      this.log('Run ' + chalk.blue('npm install') + ' to install dependencies later');
    }
  }

  end () {
    if (this.props.sprites.indexOf('svg') > -1) {
      this.log(
        '\n'
        + chalk.red('DON\'T FORGET')
        + ' to install '
        + chalk.blue('svg4everybody')
        + ' or ' + chalk.blue('svgxuse')
        + ' otherwise IE will not show you svg sprite ¯\\_(ツ)_/¯'
        + '\n'
      );
    }
    this.log(chalk.green('Done!'));
  }
};
