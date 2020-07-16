const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  watch: false,
  entry: "./ecom/frontend/src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "ecom/frontend/static/frontend")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff2|woff|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 2500 }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: ["*", ".js", ".scss"]
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dev"),
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new Dotenv({
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      silent: true // hide any errors
    })
  ]
};
