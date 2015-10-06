module.exports = ($) => {
    'use strict'

    $.gulp.task('watch', () =>
        $.gulp.watch([`${$.deploy.dir}/**/*`], (event) => {
            const FILE_NAME = $.path.relative(__dirname, event.path)

            $.tinylr.changed({
                body: {
                    files: [FILE_NAME]
                }
            })
        })
    )

    $.gulp.watch(`${$.client.dir}/**/*.jade`, () => $.runSequence('jade', 'templateCache'))

    $.gulp.watch([
        `${$.client.dir}/**/*.js`,
        `!${$.client.dir}/**/_*.js`,
        `!${$.client.dir}/**/*.config.js`,
        `!${$.client.dir}/**/*.spec.js`
    ], ['scripts'])

    $.gulp.watch(`${$.client.dir}/**/_*.js`, ['jade-script'])

    $.gulp.watch(`${$.client.dir}/**/*.styl`, ['styles'])

    $.gulp.watch(`${$.client.guide}/**/*.styl`, ['styles-guide'])
    $.gulp.watch(`${$.client.serverTasks}/*.js`, ['compile'])
}