const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

const package = require('./package.json');

module.exports = {
    entry: {
        "rotatex": './src/rotatex.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-loader",
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
					{
						loader: 'css-loader',
					},
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.ejs",
            scriptLoading: "blocking",
            inject: "head",
            templateParameters: {
                name: package.name,
                version: package.version
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/favicon.ico', to: 'favicon.ico' }
            ]
        })
    ]
};

// const webpack = require('webpack');
// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// // const CopyWebpackPlugin = require('copy-webpack-plugin');
// // const WebpackAutoInject = require('webpack-auto-inject-version');

// const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');

// class MiniCssExtractPluginCleanup {
// 	constructor(deleteWhere = /demo\.js(\.map)?$/) {
// 	  this.shouldDelete = new RegExp(deleteWhere)
// 	}
// 	apply(compiler) {
// 	  compiler.hooks.emit.tapAsync("MiniCssExtractPluginCleanup", (compilation, callback) => {
// 		// compilation.chunks.forEach((chunk) => {
// 		// 	// let idx = chunk.files.filter(this.shouldDelete.test);
// 		// 	let idx = -1;
// 		// 	chunk.files.delete('demo.js');
// 		// 	// let idx = chunk.files[this.shouldDelete];
// 		// 	console.log(idx, chunk.files instanceof Array);
// 		// 	// if (idx > -1) {
// 		// 	// 	chunk.files.splice(idx, 1);	
// 		// 	// }
// 		// 	chunk.files.forEach(element => {
// 		// 		console.log(chunk.name,element)	
// 		// 	});
// 		// });

// 		Object.keys(compilation.assets).forEach((asset) => {
// 			if (this.shouldDelete.test(asset)) {
// 				delete compilation.assets[asset]
// 		  	}
// 		})
// 		callback()
// 	  })
// 	}
//   }

// module.exports = {
// 	// target: '',
// 	mode: 'development',
//     entry: {
//         // 'demo': ['./src/demo.scss'],
// 		// 'rotatex': ['./src/rotatex.js', './src/rotatex.scss'],
// 		'rotatex': './src/rotatex.js',
// 		'demo': './src/demo.scss',
        
//         // 'rotatex.min': './src/rotatex.js',
//         // 'rotatex.min': ['./src/rotatex.js', './src/rotatex.scss']
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
// 		filename: '[name].js',
// 		libraryTarget: 'umd',
// 		// the name exported to window
// 		// library: 'aaabbb',
// 		// globalObject: 'this'
// 		// library: "aaabbb",
// 		// library: {
// 		// 	name: 'aaabbb',
// 		// 	type: 'umd',
// 		//   },
//     },
//     optimization: {
//       minimize: false
//   //     minimizer: [
//   //       new TerserPlugin({
//   //         test: /\.min\.js$/,
//   //         // parallel: true,
//   //         // sourceMap: true, // Must be set to true if using source-maps in production
//   //         terserOptions: {
//   //           sourceMap: true
//   //           // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
//   //         },
//   //       }),
//   //     ],
//   },
//     devtool: 'source-map',
// 	module: {
// 		rules: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				use: [
// 					{
// 						loader: "babel-loader",
// 						// options: {
// 						// 	presets: ['@babel/preset-env'],
// 						// 	plugins: [       
// 						// 		 [
// 						// 		"@babel/plugin-transform-modules-umd",
// 						// 		{
// 						// 			"globals": {
// 						// 				"Rotatex": "Rotatex"
// 						// 			}
// 						// 		}
// 						// 	]
// 						// 	,]
// 						//   }
// 					}
// 				]
// 			},
// 			// {
// 			// 	test: /\.html$/,
// 			// 	use: [
// 			// 		{
// 			// 			loader: "html-loader",
// 			// 			options: { minimize: true }
// 			// 		}
// 			// 	]
// 			// },
// 			// {
// 			// 	test: /\.(png|svg|jpg|gif)$/,
// 			// 	use: [
// 			// 		"file-loader"
// 			// 	]
// 			// },
// 			{
// 				test: /\.s[ac]ss$/i,
// 				use: [
// 					{ loader: 'style-loader' },
//           // MiniCssExtractPlugin.loader,
//           {
//             loader: MiniCssExtractPlugin.loader,
//             options: {
//                 esModule: false,
//             },
//         },
// 					{
// 						loader: 'css-loader'
// 					},
// 					{
// 						loader: 'postcss-loader'
// 					},
// 					{
// 						loader: 'sass-loader'
// 					}
// 				]
// 			},
// 			// {
// 			// 	test: /\.(woff|woff2|eot|ttf|otf)$/,
// 			// 	loader: 'file-loader',
// 			// 	options: {
// 			// 		outputPath: './fonts',
// 			// 	}
// 			// }
// 		]
// 	},
// 	// output: {
// 	//     publicPath: ASSET_PATH,
// 	// },
//       devServer: {
//         contentBase: path.resolve(__dirname, ''),
//         port: 8080,
//         publicPath: '/',
//         openPage: 'demo'
//     },
// 	plugins: [
// 		new CleanWebpackPlugin(),
// 		// new webpack.ProvidePlugin({
// 		// 	'Dygraph': 'dygraphs'
// 		// }),
// 		// new webpack.ProvidePlugin({
// 		//     'Dygraph22': 'dygraphs-synchronizer'
// 		// }),
// 		// new MiniCssExtractPluginCleanup(),
// 		new HtmlWebPackPlugin({
// 			template: "./src/index.html",
//     //   filename: "./index.html",
//       inject: false,
// 	  minify: false,
// 	//   scriptLoading: 'blocking',
// 	//   inject: "head",
// 	//   excludeChunks: ['demo']
// 	// files: {
// 	// 	js: ['rotatex.js'],
// 	// 	css: ['rotatex.css', 'demo.css']
// 	// 	}
// 	}),
// 		new MiniCssExtractPluginCleanup(),
// 		new MiniCssExtractPlugin({
// 	  		filename: "[name].css",
// 	//   chunkFilename: "[id].css"
// 		}),

// 		// new HtmlWebPackPlugin({
// 		// 	template: "./src/index.html",
//       	// 	filename: "./index.html",
// 	  	// 	minify: false,
// 	  	// 	scriptLoading: 'blocking',
// 	  	// 	inject: "head"
// 		// }),


//     // new webpack.optimize.UglifyJsPlugin({
//     //   include: /\.min\.js$/,
//     //   minimize: true
//     // })

//     // new CopyWebpackPlugin({
// 		// 	patterns: [
// 		// 		{ from: './src/sitemap.xml', to: 'sitemap.xml' },
// 		// 		{ from: './src/favicon.ico', to: 'favicon.ico' },
// 		// 		{ from: './src/img', to: 'img' },
// 		// 		{ from: './src/i18n/locales', to: 'locales' },
// 		// 		// { from: './src/fonts', to: 'fonts' },
// 		// 		{ from: './src/external', to: 'external' },
// 		// 		{ from: './src/pwa', to: '' }
// 		// 	]
// 		// }),
// 		// new WebpackAutoInject({
// 		// 	// options
// 		// 	// example:
// 		// 	components: {
// 		// 		AutoIncreaseVersion: false
// 		// 	}
// 		// })
// 	]
// }