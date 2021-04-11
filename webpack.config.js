const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
    entry: {
        'rotatex.js': './src/rotatex.js',
        'rotatex.min.js': './src/rotatex.js',
        'rotatex': './src/rotatex.css',
        'rotatex.min': './src/rotatex.css',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]'
    },
    watch: false,
    mode: "development",
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                include: /\.min\.js$/
              }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.min\.css$/
            })
        ]
    },
    plugins: this.mode === 'production' ? [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ] : [
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, ''),
        port: 8080,
        publicPath: '/',
        openPage: 'demo'
    }
}