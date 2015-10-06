module.exports = ($) => {
    'use strict'

    $.gulp.task('styles', () =>
        $.gulp
        .src([
            `${$.client.dir}/**/*.styl`,
            `!${$.client.dir}/**/_*.styl`,
            `!${$.client.dir}/**/_**/**/*.styl`
        ])
        .pipe($.styles({
            linenos: true
        }))
        .pipe($.gulp.dest($.deploy.dir))
        .on('error', (error) => {
            console.log(error)
        })
    )
}