'use strict'

import del from 'del'
import fs from 'fs'
import rimraf from 'rimraf'

module.exports = ($, config, gulp) => {
    gulp.task('clean', (cb) => 
        rimraf(config.paths.deploy.base, cb)
    )
}