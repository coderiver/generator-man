// add mysqldump as a dependency
var gulp = require('gulp');

var config = require('../config');
var mysqlDump = require('mysqldump');

// dumpDatabase

var today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1 //January is 0!
yyyy = today.getFullYear();
if (dd < 10) { dd = '0' + dd }
if (mm < 10) { mm = '0' + mm }
today = dd + '-' + mm + '-' + yyyy;

gulp.task('dumpDatabase', () => {
    if (config.env === 'development') {
        return gulp;
    } else {
        console.log('production');
        return new Promise((resolve, reject) => {
            mysqlDump(
                {
                    connection: {
                        host: 'localhost',
                        user: 'root',
                        password: 'root',
                        database: 'etno',
                        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
                        // dest: 'backup.sql'
                    },
                    dumpToFile: config.dest.root + '/' + today + '.sql'
                });
        })
        .catch ((err) => {
            console.log(err);
        });
    }
});

