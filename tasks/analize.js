'use strict'

import del from 'del'
import plato from 'plato'
import runSequence from 'run-sequence'

module.exports = ($, config, gulp) => {
    gulp.task('clean-plato', (cb) =>
        del([
            config.paths.plato
        ], {
            force: true
        }, cb)
    )

    gulp.task('plato', () => {
        const OPTIONS = {}
        const FILES = [
            `${config.paths.deploy.js}/**/*.js`,
            `${config.paths.deploy.views}/**/*.js`
        ]

        plato.inspect(FILES, config.paths.plato, OPTIONS, () => runSequence('webserver-analize'))
    })

    gulp.task('webserver-analize', () => require(`../${config.paths.server}/server-analize.js`)(config))
    gulp.task('analysis', () => runSequence('clean-plato', 'plato'))
}