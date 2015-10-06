'use strict'

//import rimraf from 'rimraf'
import del from 'del'

module.exports = ($, config, gulp) => {
    gulp.task('clean', (cb) => 
        // rimraf(config.paths.deploy.base, cb)
        del(config.paths.deploy.base, {
            force: true
        }, cb)
    )
}