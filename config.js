'use strict'

const $ = {
    babel: require('gulp-babel'),
    changed: require('gulp-changed'),
    connect: require('connect-livereload'),
    data: require('gulp-data'),
    del: require('del'),
    express: require('express'),
    extend: require('extend'),
    fs: require('fs'),
    gulp: require('gulp'),
    inject: require('gulp-inject'),
    jade: require('gulp-jade'),
    karma: require('karma').server,
    ngAnnotate: require('gulp-ng-annotate'),
    open: require('open'),
    path:require('path'),
    request: require('request'),
    runSequence: require('run-sequence'),
    styles: require('gulp-stylus'),
    templateCache: require('gulp-angular-templatecache'),
    tinylr: require('tiny-lr')(),
    uglify: require('gulp-uglify'),
    useref: require('gulp-useref'),
    wrap: require('gulp-wrap'),

    plato: './.tmp/analysis/plato',
    server: './server',
    tasks: './tasks',

    client: {
        assets: './client/assets',
        dir: './client',
        guide: './client/guide',
        styles: './client/styles',
        vendor: './client/_vendor'
    },

    deploy: {
        app: './.tmp/deploy/app',
        assets: './.tmp/deploy/assets',
        dir: './.tmp/deploy',
        guide: './.tmp/deploy/guide',
        guideIndex: './.tmp/deploy/guide.html',
        index: './.tmp/deploy/index.html',
        js: './.tmp/deploy/js',
        styles: './.tmp/deploy/styles',
        vendor: './.tmp/deploy/vendor',
        views: './.tmp/deploy/views'
    },

    dist: {
        allJs: './dist/js/all.js',
        app: './dist/app',
        dir: './dist',
        index: './dist/index.html',
        js: './dist/js',
        styles: './dist/styles',
        vendor: './dist/vendor'
    },

    jsonData: {}
}

$.fn = {
    jsonJade(file) {
        const NAME = file.path
        const FILEJADE = $.path.basename(NAME, '.jade')

        let dirname = $.path.dirname(NAME)
        dirname = dirname.replace(`${$.path.sep}client${$.path.sep}`, `${$.path.sep}deploy${$.path.sep}`)

        const ROUTE = $.path.resolve(__dirname, dirname, '_' + FILEJADE + '.js')
        const JSON_FILE = ($.fs.existsSync(ROUTE)) ? require(ROUTE) : {}
        delete require.cache[ROUTE]

        $.extend(true, $.jsonData, JSON_FILE)

        return $.jsonData
    },

    readFolder(folder) {
        const PATH = $.path.join(__dirname, folder)
        const FILES = $.fs.readdirSync(PATH)

        FILES.forEach((file) => {
            require(`${$.tasks}/${file}`)($)
        })
    }
}

module.exports = $