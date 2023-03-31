const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|bower_components/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
    library: {
      name: "@sh/react-form-engine",
      type: "umd",
    },
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
  },
});
