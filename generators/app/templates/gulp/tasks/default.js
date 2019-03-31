import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', cb => runSequence(
    'build:dev',
    'watch',
    'server',
    cb
	)
);
