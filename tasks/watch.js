'use strict'

module.exports = ($, config, gulp) => {

    const DEPLOY_PATH = config.paths.deploy.base;

    gulp.task('watch', () =>
        gulp.watch([`${DEPLOY_PATH}/**/*`], (event) => {
            const FILE_NAME = $.path.relative(__dirname, event.path)

            $.tinylr.changed({
                body: {
                    files: [FILE_NAME]
                }
            })
        })
    )

    gulp.watch(`${DEPLOY_PATH}/**/*.jade`, () => $.runSequence('jade', 'templateCache'))

    gulp.watch([
        `${DEPLOY_PATH}/**/*.js`,
        `!${DEPLOY_PATH}/**/_*.js`,
        `!${DEPLOY_PATH}/**/*.config.js`,
        `!${DEPLOY_PATH}/**/*.spec.js`
    ], ['scripts'])

    gulp.watch(`${DEPLOY_PATH}/**/_*.js`, ['jade-script'])

    gulp.watch(`${DEPLOY_PATH}/**/*.styl`, ['styles'])

    gulp.watch(`${config.paths.client.guide}/**/*.styl`, ['styles-guide'])
    gulp.watch(`${config.paths.client.serverTasks}/*.js`, ['compile'])
}