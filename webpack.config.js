const isDev = process.env.NODE_ENV === "development";
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  mode: isDev ? "development" : "production",
  entry: [
    "@babel/polyfill", // enables async-await
    "./client/index.js",
  ],
  output: {
    pathinfo: false,
    path: __dirname,
    filename: "./public/bundle.js",
  },
  // optimization: {
  //   removeAvailableModules: false,
  //   removeEmptyChunks: false,
  //   splitChunks: false,
  // },
  // plugins: [new HardSourceWebpackPlugin()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
