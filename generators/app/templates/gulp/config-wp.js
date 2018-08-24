var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;

var destPath = 'build';

const siteName = '<%= _.kebabCase(name) %>';
const wpPath = `../${siteName}.loc/wp-content/themes/${siteName}`;

// configuration for dump db
const dbConfig = {
    user: 'root',
    password: 'root',
    db: siteName
}

// for deploying wordpress theme with gulp task 

const ftp = {
    user: 'user',
    password: 'password',
    host: 'host',
    folder: `/wp-content/themes/${siteName}`
}
var config = {
    env       : 'development',
    production: production,
    db: dbConfig,
    ftp: ftp,
    src: {
        root         : 'src',
        templates    : 'src/templates',
        templatesData: 'src/templates/data',
        pagelist     : 'src/index.yaml',
        sass         : 'src/sass',
        // path for sass files that will be generated automatically via some of tasks
        sassGen      : 'src/sass/generated',
        js           : 'src/js',
        img          : 'src/img',
        svg          : 'src/img/svg',
        icons        : 'src/icons',
        // path to png sources for sprite:png task
        iconsPng     : 'src/icons',
        // path to svg sources for sprite:svg task
        iconsSvg     : 'src/icons',
        // path to svg sources for iconfont task
        iconsFont    : 'src/icons',
        fonts        : 'src/fonts',
        lib          : 'src/lib',
        wp           : 'src/wp'
    },
    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/css',
        js   : destPath + '/js',
        img  : destPath + '/img',
        fonts: destPath + '/fonts',
        lib  : destPath + '/lib',
        cssWp: wpPath + '/css',
        jsWp : wpPath + '/js',
        imgWp: wpPath + '/img',
        fontsWp: wpPath   + '/fonts',
        wp   : wpPath
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
