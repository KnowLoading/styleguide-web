module.exports = ($) => {
    'use strict'

    $.gulp.task('scripts-js-test', () =>
        $.gulp
        .src([
            `${$.client.dir}/**/*.config.js`,
            `${$.client.dir}/**/*.spec.js`
        ])
        .pipe($.changed($.deploy.dir))
        .pipe($.babel())
        .pipe($.gulp.dest($.deploy.dir))
    )

    $.gulp.task('karma', (done) =>
        $.karma.start({
            configFile: $.path.resolve(__dirname, '../karma.conf.js')
        }, () => done)
    )

    $.gulp.watch([
        `${$.client.dir}/**/*.config.js`,
        `${$.client.dir}/**/*.spec.js`
    ], ['scripts-js-test'])
}