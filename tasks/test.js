'use strict'

module.exports = ($, config, gulp) => {

    const CLIENT_PATH = config.paths.client.base;
    const DEPLOY_PATH = config.paths.deploy.base;

    gulp.task('scripts-test', () =>
        gulp
        .src([
            `${CLIENT_PATH}/**/*.config.js`,
            `${CLIENT_PATH}/**/*.spec.js`
        ])
        .pipe($.changed(DEPLOY_PATH))
        .pipe($.babel())
        .pipe(gulp.dest(DEPLOY_PATH))
    )

    gulp.task('karma', (done) =>
        $.karma.start({
            configFile: $.path.resolve(__dirname, '../karma.conf.js')
        }, () => done)
    )

    gulp.watch([
        `${CLIENT_PATH}/**/*.config.js`,
        `${CLIENT_PATH}/**/*.spec.js`
    ], ['scripts-test'])
}