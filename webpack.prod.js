const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    plugins:[
        //wtf?:
        //new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        //The output directory as an absolute path:
        path: path.resolve(__dirname, "wordpress/wp-content/themes/wuetheme/app"),
        publicPath: '/wp-content/themes/wuetheme/app/',
        //https://webpack.js.org/configuration/output#outputpublicpath:
        //publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
        //publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
        //publicPath: '/assets/', // server-relative
        //publicPath: 'assets/', // relative to HTML page
        //publicPath: '../assets/', // relative to HTML page
        //publicPath: '', // relative to HTML page (same directory)

    },
});