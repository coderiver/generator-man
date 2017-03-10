'use strict';
var fs = require('fs');
var path = require('path');
var flatten = require('flatten');
var gulpIgnore = require('gulp-ignore');

var appendStars = function (str) {
  return [
    path.join(process.cwd(), str + '**'),
    path.join(process.cwd(), str + '/**')
  ];
};

module.exports = function (gitignorePath) {
  gitignorePath = gitignorePath || path.resolve('.gitignore');

  var contents = fs.readFileSync(gitignorePath, 'utf8');
  var ignoredFiles = contents.split('\n')
    .map(Function.prototype.call, String.prototype.trim) // trim lines
    .filter(Boolean) // ignore empty lines
    .map(appendStars);

  return gulpIgnore.exclude(flatten(ignoredFiles));
};
