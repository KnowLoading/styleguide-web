'use strict'

const config = {

    paths: {
        plato: './_analysis/plato',
        server: './server',
        tasks: './tasks',

        client: {
            assets: './client/assets',
            base: './client',
            guide: './client/guide',
            styles: './client/styles',
            vendor: './client/_vendor'
        },

        deploy: {
            app: './.tmp/app',
            assets: './.tmp/assets',
            base: './.tmp',
            guide: './.tmp/guide',
            guideIndex: './.tmp/guide.html',
            index: './.tmp/index.html',
            js: './.tmp/js',
            styles: './.tmp/styles',
            vendor: './.tmp/vendor',
            views: './.tmp/views'
        },

        dist: {
            allJs: './js/all.js',
            app: './app',
            base: './dist',
            index: './index.html',
            js: './js',
            styles: './styles',
            vendor: './vendor'
        },
    },

    data: {}
}

module.exports = config