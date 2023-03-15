const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: ["./src/hello.ts"],
  },
  output: {
    filename: "hello.mjs",
    path: path.resolve(__dirname, "dist/mjs"),
    libraryTarget: "module",
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    usedExports: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
