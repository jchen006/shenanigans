const path = require("path");

module.exports = {
  entry: {
    bundle: "./index.jsx"
    // "ingredient-frequency-bar-chart": "./experiments/IngredientFrequency/IngredientFrequencyBarChart.jsx",
    // "recipe-generator": "./components/RecipeGenerator/RecipeGenerator.jsx",
    // "pending-recipe-list": "./components/admin/curation/PendingRecipeList.jsx"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  output: {
    path: __dirname + "/react-components",
    filename: "[name].js"
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "components/")
    }
  },
  node: {
    fs: "empty"
  },
  externals: ["child_process"]
};
