'use strict'

import stylus from 'stylus'

module.exports = ($, config, gulp) => {

    const CLIENT_PATH = config.paths.client.base;
    const DEPLOY_PATH = config.paths.deploy.base;

    gulp.task('styles', () =>
        gulp
        .src([
            `${CLIENT_PATH}/**/*.styl`,
            `!${CLIENT_PATH}/**/_*.styl`,
            `!${CLIENT_PATH}/**/_**/**/*.styl`
        ])
        .pipe($.stylus({
            linenos: true
        }))
        .pipe(gulp.dest(DEPLOY_PATH))
        .on('error', (error) => {
            console.log('ERROR STYLUS' + error);
        })
    )
}