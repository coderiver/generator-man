var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var changed  = require('gulp-changed');
var plumber  = require('gulp-plumber');
var config   = require('../config');

gulp.task('imagemin', function() {
    gulp.src([
            config.src.img + '/**/*.{jpg,png,svg,gif}',
            '!' + config.src.img + '/icons/**/*'
        ])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(changed(config.dest.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('imagemin:watch', function() {
    gulp.watch([
        config.src.img + '/**/*',
        '!' + config.src.img + '/icons/**/*'
    ], ['imagemin']);
});
