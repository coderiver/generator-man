import del from 'del';
import util from 'gulp-util';
import config from '../config';

const build = () => {
  return function () {
    return del([
      config.dest.root
    ])
    .then(paths => util.log('Deleted:', util.colors.magenta(paths.join('\n'))))
  };
};

module.exports.build = build;
