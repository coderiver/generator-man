'use strict';

module.exports = {
  generator: [{
    type: 'confirm',
    name: 'spritesmith',
    message: 'Do you want to use Sprites?',
    default: true
  },
  {
    type: 'confirm',
    name: 'jade',
    message: 'Do we need Jade?',
    default: false
  },
  {
    type: 'confirm',
    name: 'iconfont',
    message: 'Create iconfont from SVG?',
    default: true
  },
  {
    type: 'checkbox',
    name: 'features',
    message: 'Choose additional features',
    choices: [{
      name: 'jQuery',
      value: 'useJquery',
      checked: true
    }, {
      name: 'Image optimisation',
      value: 'useOptim',
      checked: false
    }, {
      name: 'Automatic sprites',
      value: 'useSprites',
      checked: false
    }, {
      name: 'Icomoon',
      value: 'useIcomoon',
      checked: false
    }, {
      name: 'Bootstrap',
      value: 'useBootstrap',
      checked: false
    }, {
      name: 'Modernizr',
      value: 'useModernizr',
      checked: false
    }, {
      name: 'Browserify',
      value: 'useBrowserify',
      checked: false
    }]
  }],

  update: [{
    type: 'list',
    name: 'updateNotify',
    message: 'Do you want to update your current version?',
    choices: [{
      name: 'Yes (stops the generator and copies the update command to clipboard)',
      value: 'yesandcopy'
    }, {
      name: 'Yes (stops the generator)',
      value: 'yes'
    }, {
      name: 'No (continues running the generator)',
      value: 'No'
    }],
    default: 'yesandcopy'
  }]
};
