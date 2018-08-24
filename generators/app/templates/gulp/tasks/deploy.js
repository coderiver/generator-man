var config      = require('../config');

var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
 
gulp.task( 'deploy', function () {
 
    var conn = ftp.create( {
        host:     config.ftp.host,
        user:     config.ftp.user,
        password: config.ftp.password,
        parallel: 10,
        log:      gutil.log
    } );
 
    var globs = [
        `${config.src.fonts}/**`,
        `${config.src.wp}/**`
    ];
 
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
 
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( `/wp-content/themes/theme` ) ) // only upload newer files
        .pipe( conn.dest( `/wp-content/themes/theme` ) );
 
} );

