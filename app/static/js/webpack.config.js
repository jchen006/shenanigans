const path = require('path');

module.exports = {
    entry: {
        "bundle" : "./index.jsx"
        // "ingredient-frequency-bar-chart": "./experiments/IngredientFrequency/IngredientFrequencyBarChart.jsx",
        // "recipe-generator": "./components/RecipeGenerator/RecipeGenerator.jsx",
        // "pending-recipe-list": "./components/admin/curation/PendingRecipeList.jsx"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: __dirname,
                exclude: [/node_modules/]
            },
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
		filename: '[name].js'
    },
    devtool: 'eval-source-map',
    resolve : {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve('./')
        ]
    },
    node: {
        fs: 'empty'
    },
    externals: [
        'child_process'
    ]
};
