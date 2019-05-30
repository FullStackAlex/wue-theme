const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

/**
 * enable or disable sourceMap
 **/
let  sourceMap = false;


module.exports = {
    entry: {
        babelPolyfill: "babel-polyfill",
        app: './src/main.js',
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, 'src'),
            "@node_modules": path.resolve(__dirname, 'node_modules'),
            'vue$': 'vue/dist/vue.esm.js',
            '@styles': path.resolve(__dirname, 'src/less'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options:{
                        sourceMap: sourceMap
                    }
                }, {
                    loader: 'less-loader', options: {
                        strictMath: true,
                        noIeCompat: true,
                        sourceMap: sourceMap
                    }
                },]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }

            },
            {
                test: /\.(svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'svg/'
                }

            },{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-syntax-dynamic-import',
                        'transform-es2015-arrow-functions'
                    ]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ]
    }
};