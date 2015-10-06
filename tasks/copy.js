'use strict'

import runSequence from 'run-sequence'

module.exports = ($, config, gulp) => {

    const copy = (src, dest) =>
        () =>
            gulp.src(src)
            .pipe(gulp.dest(dest))

    gulp.task('copy:assets', copy(`${config.paths.client.assets}/**/*`, config.paths.deploy.assets))
    gulp.task('copy:vendor', copy([`${config.paths.client.vendor}/**/*`], config.paths.deploy.vendor))
    gulp.task('copy', (cb) => runSequence(['copy:assets', 'copy:vendor'], cb))

    gulp.task('copy:template', copy(`${config.paths.deploy.js}/templates.js`, config.paths.deploy.tmpJs))
}