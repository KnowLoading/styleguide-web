'use strict'

import utils from '../utils.js'

module.exports = ($, config, gulp) => {

    const CLIENT_PATH = config.paths.client.base;
    const DEPLOY_PATH = config.paths.deploy.base;

    gulp.task('jade', () =>
        gulp
        .src([
            `${CLIENT_PATH}/**/*.jade`,
            `!${CLIENT_PATH}/**/_*.jade`,
            `!${CLIENT_PATH}/**/_**/**/*.jade`
        ])
        .pipe($.changed(DEPLOY_PATH, {extension: '.html'}))
        .pipe($.data((file) => utils.getTemplateData(file)))
        .pipe($.jade({
            pretty: true
        }))
        .on('error', (error) => {
            console.log(error)
        })
        .pipe(gulp.dest(DEPLOY_PATH))
    )

    gulp.task('jade-script', () =>
        gulp
        .src([`${CLIENT_PATH}/**/_*.js`])
        .pipe($.changed(DEPLOY_PATH))
        .pipe($.babel())
        .pipe(gulp.dest(DEPLOY_PATH))
        .pipe($.data((fileJs) => {
            // JADE IN _DEPLOY
            const JADE_FILE = fileJs.path
                .replace(`${$.path.sep}_deploy`, `${$.path.sep}dev`)
                .replace(`${$.path.sep}_`, $.path.sep)
                .replace('.js', '.jade')

            // ROUTE DIR OF JADE
            let dirJade = fileJs.path.split($.path.sep)
            dirJade.pop()
            dirJade = dirJade.join($.path.sep)

            // COMPILE JADE
            gulp
            .src(JADE_FILE)
            .pipe($.data((file) => utils.getTemplateData(file)))
            .pipe($.jade({
                pretty: true
            }))
            .on('error', (error) => {
                console.log(error)
            })
            .pipe(gulp.dest(dirJade))
        }))
    )
}