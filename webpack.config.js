var CopyWebpackPlugin = require("copy-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require("path")

module.exports = {
	entry: "./src/js/main.js",
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js"
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js', '.less']
	},
	devtool: "inline-source-map",
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: "./src/index.html", to: path.join(__dirname, "build") },
			{ from: "./src/img", to: path.join(__dirname, "build/img") },
			{ from: "./src/vendor", to: path.join(__dirname, "build/vendor") }
		]),
		new ExtractTextPlugin("style.css")
	],
	devServer: {
    	historyApiFallback: true,
    	port: 3000
  	}
}