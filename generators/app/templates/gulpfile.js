'use strict';
<% if (spritesmith) { %>
SPRITESMITH!!!
<% } %>
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    notify = require('gulp-notify'),
    include = require("gulp-include"),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require("browser-sync"),
    iconfont = require("gulp-iconfont"),
    consolidate = require("gulp-consolidate"),
    rimraf = require('rimraf'),
    mqpacker = require("css-mqpacker"),
    plumber = require("gulp-plumber"),
    jade = require("gulp-jade"),
    reload = browserSync.reload;

// what and where to compile
var src  = {
    root    : 'src/',
    jade    : 'src/jade',
    sass    : 'src/sass/',
    js      : 'src/js/',
    img     : 'src/img/',
    helpers : 'src/helpers/'
};
var dest = {
    root    : 'site/',
    css     : 'site/css/',
    html    : 'site/',
    js      : 'site/js/',
    img     : 'site/img/'
};



//sass
gulp.task('sass', function() {

    var processors = [
        autoprefixer({browsers: ['last 10 versions'], cascade: false}),
        mqpacker({
            sort: function (a, b) {
                a = a.replace(/\D/g,'');
                b = b.replace(/\D/g,'');
                return b-a;
                // replace this with a-b for Mobile First approach
            }
        })
    ];

    return sass(src.sass+'*.sass', {
        sourcemap: true,
        style: 'compact',
        emitCompileError: true
    })
    .on('error', notify.onError({
        title: 'Sass Error!',
        message: 'error'
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest.css));
});


// sprite
gulp.task('sprite', function() {
    var spriteData = gulp.src(src.img + '/icons/*.png')
    .pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_sprite.sass',
        imgPath: '../img/icons.png',
        cssFormat: 'sass',
        padding: 4,
        // algorithm: 'top-down',
        cssTemplate: src.helpers + '/sprite.template.mustache'
    }));
    spriteData.img
        .pipe(gulp.dest(dest.img));
    spriteData.css
        .pipe(gulp.dest(src.sass+'/lib/'))
        .pipe(notify("New sprite created!"));
});

// html includes
gulp.task('html', function () {
    gulp.src(src.root+'*.html')
        .pipe(include())
        .on('error', function(){notify("HTML include error");})
        .pipe(gulp.dest(dest.root))
        .pipe(reload({stream: true}));
});

// js includes
gulp.task('js', function () {
    gulp.src(src.js+'**/*.js')
        .pipe(include())
        .on('error', function(){notify("Javascript include error");})
        .pipe(gulp.dest(dest.js))
        .pipe(reload({stream: true}));
});

// copy static files
gulp.task('copy', function() {
   gulp.src(src.img+'*.*')
   .pipe(gulp.dest(dest.img));
   gulp.src(src.root+'fonts/*.*')
   .pipe(gulp.dest(dest.css+'fonts/'));
   gulp.src(src.root+'video/*.*')
   .pipe(gulp.dest(dest.root+'video/'));
});

gulp.task('delete', function (cb) {
    rimraf('./'+dest.root, cb);
});



// jade, requires:
// = gulp-jade
// = gulp-changed
// = gulp-plumber
// = gulp-notify
// npm install gulp-jade && npm-install gulp-changed && npm-install gulp-plumber && npm-install gulp-notify
//  plumber = require("gulp-plumber")
//  jade = require("gulp-jade")
gulp.task('jade', function() {
    return gulp.src([src.jade + '/*.jade', '!' + src.jade + '/_*.jade', '!' + src.jade + '/includes/*.jade'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        // .pipe(changed(dest.html, {extension: '.html'}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(dest.html));
});

//compile all jade files
gulp.task('jade-all', function() {
    return gulp.src([src.jade + '/*.jade', '!' + src.jade + '/_*.jade', '!' + src.jade + '/includes/*.jade'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(dest.html));
});


// icon font
var fontname = 'svgfont';
gulp.task('font', function(){
  return gulp.src(src.img+'svg/*.svg')
    // .pipe(svgmin())
    .pipe(iconfont({
      fontName: fontname,
      appendUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }))
    .on('glyphs', function(glyphs, options) {
        console.log(glyphs);
        gulp.src(src.helpers+'_svgfont.sass')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: 'fonts/',
                className: 'icon'
            }))
            .pipe(gulp.dest(src.sass+'lib/'));
        gulp.src(src.helpers+'icons.html')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: 'fonts/',
                className: 'icon',
                htmlBefore: '<i class="icon ',
                htmlAfter: '"></i>',
                htmlBr: ''
            }))
            .pipe(gulp.dest(dest.root));
    })
    .pipe(gulp.dest(dest.css+'fonts/'))
    .pipe(reload({stream: true}))
    .pipe(notify("Icon font updated!"));
});




//webserver
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: dest.root
        },
        files: [dest.html + '*.html', dest.css + '*.css', dest.js + '*.js'],
        port: 8080,
        notify: false,
        ghostMode: false,
        online: false,
        open: true
    });
});

gulp.task('watch', function() {
    gulp.watch(src.sass + '/**/*', ['sass']);
    gulp.watch(src.js+'*', ['js']);
    gulp.watch(src.img+'*', ['copy']);
    gulp.watch(src.root+'fonts/*', ['copy']);
    gulp.watch(src.img+'svg/*', ['font']);
    gulp.watch([src.root+'*.html', src.root+'partials/*.html'], ['html']);
    gulp.watch(src.img + '/icons/*.png', ['sprite']);
    gulp.watch(src.jade + '/**/*.jade', ['jade']);
    gulp.watch([src.jade + '/_*.jade', src.jade + '/includes/*.jade'], ['jade-all']);
});


gulp.task('default', ['browser-sync', 'watch'], function() {});
gulp.task('build', ['html','font','sprite','copy','js','sass'], function() {});