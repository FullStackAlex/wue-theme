const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        //contentBase: './dist',
        //contentBase: './',
        overlay: {
            errors: true,
            warnings: false,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },

        host: "dev.wue-theme",
        port: 9200,
        public: "dev.wue-theme:9200",
        //bundle files:
        publicPath: "/wp-content/themes/wuetheme/app/",
        stats: 'errors-only',
        https: true,
        inline: true,
        noInfo: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        hotOnly: true,
        disableHostCheck: true,

        writeToDisk: true,
        proxy: {
            '/': {
                target: "https://dev.wue-theme",
                secure: false,
                changeOrigin: true,
                autoRewrite: true,
                headers: {
                    'X-ProxiedBy-Webpack': true,
                },
            },
        },
    },
    output: {
        //custom filename structure without hashs
        filename: '[name].bundle.js',
        //The output directory as an server-internal absolute path:
        path: path.resolve(__dirname, "wordpress/wp-content/themes/wuetheme/app"),
        //relative path on the server publicly accessable:
        publicPath: "https://dev.wue-theme:9200/wp-content/themes/wuetheme/app/",
        //https://webpack.js.org/configuration/output#outputpublicpath:
        //publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
        //publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
        //publicPath: '/assets/', // server-relative
        //publicPath: 'assets/', // relative to HTML page
        //publicPath: '../assets/', // relative to HTML page
        //publicPath: '', // relative to HTML page (same directory)

    },
});