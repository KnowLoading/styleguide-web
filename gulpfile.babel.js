'use strict'

import config from './config.js'
import fs from 'fs'
import gulp from 'gulp'
import path from 'path'
import runSequence from 'run-sequence';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

const PATH = path.join(__dirname, config.paths.tasks)
const FILES = fs.readdirSync(PATH)

FILES.forEach((file) => {
    require(`${config.paths.tasks}/${file}`)($, config, gulp)
})

gulp.task('compiled', (cb) => runSequence('scripts', ['styles', 'jade', 'copy'], 'templateCache', 'watch', cb))
gulp.task('compiled:dist', (cb) => runSequence('scripts', ['styles:dist', 'jade:dist', 'copy'], 'copy:deploy', 'templateCache:dist', 'dist', cb))
gulp.task('analize', (cb) => runSequence('compiled', 'analysis', cb))
gulp.task('serve:dist', (cb) => runSequence('clean', 'compiled:dist', 'webserver:dist', cb))
gulp.task('serve', (cb) => runSequence('clean', 'compiled', 'webserver', cb))
gulp.task('test', (cb) => runSequence('clean', 'compiled', 'scripts:test', 'karma', cb))