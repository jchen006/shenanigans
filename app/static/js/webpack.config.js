/*
var HTMLWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/templates/admin/control_panel.html',
    filename: 'control_panel.html',
    inject: 'body'
});
*/

module.exports = {
    entry: {
        "ingredient-frequency-bar-chart": "./experiments/IngredientFrequency/IngredientFrequencyBarChart.jsx",
        "recipe-generator": "./components/RecipeGenerator/RecipeGenerator.jsx",
        "pending-recipe-list": "./components/admin/curation/PendingRecipeList.jsx",
        "food-network-graph":"./widgets/FoodNetworkGraph.jsx"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                include: __dirname,
                exclude: /node_modules/,
                loader: 'babel-loader' //fixed my installing other dependencies
                //query: { presets: [ 'es2015', 'react' ] }
            },
            {
                test: /\.less$/,
                loader: 'css-loader!less-loader'
            }
        ]
    },
    output: {
		path: __dirname + '/react-components',
		filename: '[name]-bundle.js'
    },
    devtool: 'source-map',
    node: {
        fs: 'empty'
    },
    externals: [
        'child_process'
    ]
};
