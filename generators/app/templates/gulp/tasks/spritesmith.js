var gulp = require('gulp');
var notify = require('gulp-notify');
var spritesmith = require('gulp.spritesmith');
var config = require('../config');


gulp.task('sprite', function() {
    var spriteData = gulp.src(config.src.img + '/icons/*.png')
    .pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_sprite.sass',
        imgPath: '../img/icons.png',
        cssFormat: 'sass',
        padding: 4,
        // algorithm: 'top-down',
        cssTemplate: config.src.helpers + '/sprite.template.mustache'
    }));
    spriteData.img
        .pipe(gulp.dest(config.dest.img));
    spriteData.css
        .pipe(gulp.dest(config.src.sass+'/lib/'))
        .pipe(notify("New sprite created!"));
});

gulp.task('sprite:watch', function() {
    gulp.watch(config.src.img + '/icons/*.png', ['sprite']);
});

