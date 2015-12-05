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
