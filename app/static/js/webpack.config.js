/*
var HTMLWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/templates/admin/control_panel.html',
    filename: 'control_panel.html',
    inject: 'body'
});
*/

module.exports = {
    entry: [
        './react-components/core/list.jsx'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname,
                exclude: /node_modules/,
                loader: 'babel-loader' //fixed my installing other dependencies
                //query: { presets: [ 'es2015', 'react' ] }
            }
		]
	},
    output: {
		path: __dirname + '/react-components',
		filename: 'index_bundle.js'
    },
//	plugin: [HTMLWebpackPluginConfig]
};
