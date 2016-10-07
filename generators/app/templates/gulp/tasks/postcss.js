var gulp         = require('gulp');
var sugarss      = require('sugarss');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var config       = require('../config');
var sassmixins   = require('gulp-sass-to-postcss-mixins');
var rename       = require('gulp-rename');


var processors = [
    require('postcss-easy-import')({
        path: config.src.sass,
        extensions: '.sss',
        prefix: '_'
    }),
    require('postcss-mixins')({
        mixinsDir: config.src.sass+'/mixins'
    }),
    require('postcss-conditionals'),
    require('postcss-advanced-variables'),
    require('postcss-media-minmax'),
    require('postcss-hexrgba'),
    require('postcss-nested'),
    require('postcss-atroot'),
    require('postcss-property-lookup'),
    require('postcss-extend'),
    require('lost'),
    autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }),
    mqpacker({
        sort: sortMediaQueries
    })
];

gulp.task('sss', function() {
    return gulp
        .src(config.src.sass + '/[^_]*.sss')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors,{ parser: function (source,opts) {          
            source = String(source).replace(/(^([ \t]|)+)[+][\w.\-\_]*($|[ \t]+|[(]([^)]|)+[)]([ \t]+|))$/gm,function(match){
              return match.replace(/[()]/g,' ').replace(/(^([ \t]|)+)[+]/g,'$1@mixin ');
            })
            return sugarss.parse(source,opts);
        } }))
        .pipe(rename({ extname: '.css' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css));
});


gulp.task('sss:watch', function() {
    gulp.watch(config.src.sass + '/**/*.sss', ['sss']);
});


gulp.task('lint:css', function() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src(config.src.sass+'/*.sss')
    .pipe(sassmixins())
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
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
