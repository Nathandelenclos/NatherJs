import * as path from 'path'
import { fileURLToPath } from 'url'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import InlineChunkHtmlPlugin from 'inline-chunk-html-plugin'
import removePlugin from 'remove-files-webpack-plugin'
import NodemonPlugin from 'nodemon-webpack-plugin';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: 'development',
    resolve: {
        alias: {
            src: path.join(__dirname, 'src'),
            client: path.join(__dirname, 'src/client'),
            server: path.join(__dirname, 'src/server'),
            public: path.join(__dirname, 'src/public'),
            node_modules: path.join(__dirname, 'node_modules')
        }
    },
    entry: {
        index: ['./src/client/index.js', './src/client/style/index.css']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new NodemonPlugin({
        script: './App.js',
        watch: path.resolve('./src'),
        args: ['4000'],
        delay: '1000',
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/public', to: './public' }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Home Page',
            filename: 'index.html',
            template: './src/client/index.html',
            chunks: ['index'],
            inlineSource: '.(js|css)$',
            inject: 'body'
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/index/]),
        new removePlugin({
            after: {
                root: './dist',
                include: [
                    'index.js'
                ],
                trash: true
            }
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: 'head',
                            injectType: 'singletonStyleTag'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlMinimizerPlugin()
        ]
    }
}
