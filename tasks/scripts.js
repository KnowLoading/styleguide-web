'use strict'

module.exports = ($, config, gulp) => {

    const CLIENT_PATH = config.paths.client.base;
    const DEPLOY_PATH = config.paths.deploy.base;

    gulp.task('scripts', () => {
        gulp
        .src([
            `${CLIENT_PATH}/**/*.js`,
            `!${CLIENT_PATH}/**/_*.js`,
            `!${CLIENT_PATH}/**/_**/**/*.js`
        ])
        .pipe($.changed(DEPLOY_PATH))
        .pipe($.babel())
        .pipe(gulp.dest(DEPLOY_PATH))
        .pipe($.wrap(
            `(function () {\n
                <%= contents %>\n
            })();`
        ))
        .pipe(gulp.dest(DEPLOY_PATH))
        .pipe($.ngAnnotate())
        .pipe(gulp.dest(DEPLOY_PATH))
        
    })
}