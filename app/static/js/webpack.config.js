const path = require("path");

module.exports = {
  entry: {
    bundle: "./index.jsx"
  },
  module: {
    rules: [
      { test: /\.{js, jsx}/, exclude: /node_modules/, use: "babel-loader" }
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
