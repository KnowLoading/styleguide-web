'use strict'

module.exports = ($, config, gulp) => {
    gulp.task('webserver', () => require(`../${config.paths.server}/server.js`)($, config))
}