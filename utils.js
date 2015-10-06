'use strict'

import fs from 'fs'
import gulp from 'gulp'
import path from 'path'
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
import _ from 'lodash'

import config from './config.js'

const utils = {

    getTemplateData(file) {
        const FILENAME = file.path
        const BASENAME = path.basename(FILENAME, '.jade')

        let dirname = path.dirname(FILENAME)
        dirname = dirname.replace(`${path.sep}client${path.sep}`, `${path.sep}deploy${path.sep}`)

        const JS_FILENAME = path.resolve(__dirname, dirname, '_' + BASENAME + '.js')
        const DATA = (fs.existsSync(JS_FILENAME)) ? require(JS_FILENAME) : {}
        delete require.cache[JS_FILENAME]

        _.extend(config.data, DATA)

        return config.data
    }
}

module.exports = utils;