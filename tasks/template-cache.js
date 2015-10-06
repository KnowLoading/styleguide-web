'use strict'

import templateCache from 'gulp-angular-templatecache'

module.exports = ($, config, gulp) => {
    gulp.task('templateCache', (done) => {
        gulp
        .src([`${config.paths.deploy.base}/**/directives/**/*.html`])
        .pipe(templateCache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest(config.paths.deploy.js))
        done()
    })
}