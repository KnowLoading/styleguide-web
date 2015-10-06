module.exports = ($) => {
    'use strict'

    $.gulp.task('scripts', () =>
        $.gulp
        .src([
            `${$.client.dir}/**/*.js`,
            `!${$.client.dir}/**/_*.js`,
            `!${$.client.dir}/**/_**/**/*.js`
        ])
        .pipe($.changed($.deploy.dir))
        .pipe($.babel())
        .pipe($.gulp.dest($.deploy.dir))
        .pipe($.wrap(
            `(function () {\n
                <%= contents %>\n
            })();`
        ))
        .pipe($.gulp.dest($.deploy.dir))
        .pipe($.ngAnnotate())
        .pipe($.gulp.dest($.deploy.dir))
    )
}