'use strict'

import utils from '../utils.js'

module.exports = ($, config, gulp) => {

    const CLIENT_PATH = config.paths.client.base;
    const DEPLOY_PATH = config.paths.deploy.base;
    const DIST_PATH = config.paths.dist.base;

    gulp.task('jade:dist', () =>
        gulp
        .src([
            `${CLIENT_PATH}/**/*.jade`,
            `!${CLIENT_PATH}/**/_**/*.jade`,
            `!${CLIENT_PATH}/**/_*.jade`,

            `!${config.paths.client.guide}/**/*.jade`,
            `!${CLIENT_PATH}/guide.jade`
        ])
        .pipe(config.paths.data((file) => utils.getTemplateData(file)))
        .pipe($.jade({
            pretty: false
        }))
        .on('error', (error) => {
            console.log(error);
        })
        .pipe(gulp.dest(DIST_PATH))
    )

    gulp.task('styles:dist', () =>
        gulp
        .src(`${config.paths.client.styles}/main.styl`)
        .pipe(config.paths.styles({
            compress: true
        }))
        .pipe(gulp.dest(config.paths.dist.styles))
    )

    gulp.task('copy:deploy', (done) =>
        gulp
        .src([
            `${DEPLOY_PATH}/**/*.*`,
            `${config.paths.deploy.vendor}/**/*.*`
        ])
        .pipe(gulp.dest(DIST_PATH))
    )

    gulp.task('generateOneScriptFile', (done) => {
        const assets = $.useref.assets()

        return gulp
        .src(config.paths.dist.index)
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(DIST_PATH))
    })

    gulp.task('compress', () =>
        gulp
        .src(`${DIST_PATH}/**/*.js`)
        .pipe($.uglify())
        .pipe(gulp.dest(DIST_PATH))
    )

    gulp.task('clean:dist', (cb) =>
        $.del([
            DEPLOY_PATH,
            DIST_PATH
        ], FORCE, cb)
    )

    gulp.task('clean:min', (cb) =>
        $.del([
            `${config.paths.dist.js}/**/*.js`,
            config.paths.dist.vendor,
            `!${config.paths.dist.js}/all.js`,
            `${DIST_PATH}/**/_*`,
            `${DIST_PATH}/**/_**/**/*`
        ], {
            force: true
        }, cb)
    )

    gulp.task('templateCache:dist', (done) =>
        gulp.src(`${DIST_PATH}/**/directives/**/*.html`)
        .pipe($.templateCache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest(config.paths.dist.js))
    )

    gulp.task('webserver:dist', () => require(`../${config.paths.server}/dist.js`)(config))

    gulp.task('dist', (cb) => $.runSequence('generateOneScriptFile', 'compress', 'clean:min', cb))
}