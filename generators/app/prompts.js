'use strict';

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Input project name',
    default: 'app'
  },
  {
    type: 'list',
    name: 'templates',
    message: 'Choose template engine',
    choices: [
      {
        name: 'Nunjucks',
        value: 'nunjucks'
      },
      {
        name: 'Swig',
        value: 'swig'
      },
      {
        name: 'Jade',
        value: 'jade'
      },
      {
        name: 'No templates, just pure html',
        value: false
      }
    ],
    default: 0
  },
  {
    type: 'list',
    name: 'bundler',
    message: 'Choose js modules bundler',
    choices: [
      {
        name: 'Webpack',
        value: 'webpack'
      },
      // {
      //   name: 'Browserify',
      //   value: 'browserify'
      // },
      {
        name: 'Not use modules bundler',
        value: null
      }
    ]
  },
  {
    type: 'checkbox',
    name: 'sprites',
    message: 'Which from icon system would be used',
    choices: [
      {
        name: 'SVG sprites',
        value: 'svg',
        checked: true
      },
      {
        name: 'Iconfonts',
        value: 'iconfont',
        checked: false
      },
      {
        name: 'PNG sprites',
        value: 'png',
        checked: false
      }
    ]
  },
  {
    type: 'confirm',
    name: 'svgo',
    message: 'Use SVGO for svg optimization?',
    default: true
  },
  {
    type: 'confirm',
    name: 'install',
    message: 'Install dependencies right now?',
    default: false
  }
];
