const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, 'src/utils/'),
            Pages: path.resolve(__dirname, 'src/pages/'),
            Shared: path.resolve(__dirname, 'src/pages/shared/'),
            Stores: path.resolve(__dirname, 'src/stores/'),
            Icons: path.resolve(__dirname, 'src/images/icons'),
            Docs: path.resolve(__dirname, 'src/docs'),
            Connection: path.resolve(__dirname, 'src/connection')
        }
    },

    entry: [
        require.resolve("react-hot-loader/patch"),
        // require.resolve("webpack-dev-server/client"),
        require.resolve("webpack/hot/dev-server"),
        "./src/index"
    ],

    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "dist"),
        port: 9000,
        host: "0.0.0.0",
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true,
        overlay: false,
        proxy: [{
            context: ['/api/**'],
            target: 'http://localhost:3000',
            secure: false,
            changeOrigin: true,
            autoRewrite: true,
        }]
    },

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "[name]-[hash].js"
    },

    devtool: "eval",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.scss|css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader"
                }, {
                    loader: "resolve-url-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            }, {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, "./src/images/icons")
                ],
                use: [{
                    loader: "babel-loader"
                }, {
                    loader: 'svg-sprite-loader',
                    options: {
                        runtimeGenerator: require.resolve('./svg-to-icon-component-runtime-generator'),
                        runtimeOptions: {
                            iconModule: './src/pages/shared/ui/Icon' // Relative to current build context folder
                        }
                    }
                }]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [
                    path.resolve(__dirname, "./src/images/icons")
                ],
                use: [{
                    loader: "file-loader",
                    options: {
                        query: {
                            hash: "sha512",
                            digest: "hex",
                            name: "[hash].[ext]"
                        }
                    }
                }, {
                    loader: "image-webpack-loader",
                    options: {
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            gifsicle: {
                                interlaced: true,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                }]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff"
                    }
                }]
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [
                    path.resolve(__dirname, "./src/images/icons")
                ],
                use: [{
                    loader: "file-loader"
                }]
            }, {
                test: /\.(xlsx)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/documents/'
                    }
                }]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('development') }}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ hash: false, template: "./index.html" }),
        new SpriteLoaderPlugin()
    ]
};
