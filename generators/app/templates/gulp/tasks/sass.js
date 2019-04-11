import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
// import mqpacker from 'css-mqpacker';
import config from '../config';
import csso from 'postcss-csso';

const isMax = mq => /max-width/.test(mq);
const isMin = mq => /min-width/.test(mq);

const sortMediaQueries = (a, b) => {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }
    return 1;
}

const processors = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }),
  // require('lost'),
  // mqpacker({
  //   sort: sortMediaQueries
  // }),
  csso
];

gulp.task('sass', () => gulp
  .src(config.src.sass + '/*.{sass,scss}')
  .pipe(sourcemaps.init())
  .pipe(sass({
      outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
      precision: 5
  }))
  .on('error', config.errorHandler)
  .pipe(postcss(processors))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.dest.css))
);

const build = gulp => gulp.parallel('sass');
const watch = gulp => () => gulp.watch(config.src.sass + '/**/*.{sass,scss}', gulp.parallel('sass'));

module.exports.build = build;
module.exports.watch = watch;
