const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, './public'),
		filename: 'bundle.js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' })],
	devServer: {
		contentBase: path.join(__dirname, './public'),
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
	},
};
