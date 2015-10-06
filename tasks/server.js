'use strict'

module.exports = ($, config, gulp) => {
    gulp.task('server', () => require(`../${config.paths.server}/deploy.js`)($, config))
}