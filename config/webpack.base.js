module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|bower_components/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                [
                  "babel-plugin-styled-components",
                  {
                    pure: true,
                    minify: true,
                    fileName: true,
                    displayName: true,
                    meaninglessFileNames: ["index", "styles", "style"],
                    transpileTemplateLiterals: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
