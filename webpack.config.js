const path = require("path");
module.exports = {
  entry: {
    index: "./src/scripts/index.js",
    edit: "./src/scripts/note-edit.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public/scripts"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
};
