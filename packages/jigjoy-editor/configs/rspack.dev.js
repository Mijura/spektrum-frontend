const path = require("path")
const { merge } = require("webpack-merge")
const rspackBaseConfig = require("./rspack.base")

const devConfig = {
	mode: "development",
	devtool: "eval",
	cache: false,
	optimization: {
		minimize: false,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "../dist"),
		},
		port: 3000,
		hot: true, // Enable HMR
		compress: false, // Enable gzip compression for assets
		historyApiFallback: true, // Support single-page application routing
		open: true, // Automatically open the browser
	},
}

const mergedConfig = merge(rspackBaseConfig, devConfig)

module.exports = mergedConfig
