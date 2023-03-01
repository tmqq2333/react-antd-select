const path = require("path");
const NODE_ENV = process.env.NODE_ENV; // 获取环境变量
const isProd = NODE_ENV === "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 每次构建清除上一次打包出来的文件
const nodeExternals = require("webpack-node-externals");
const plugins = [new CleanWebpackPlugin()]
 

module.exports = {
  mode: "production",
  entry: "./src/components/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget:"commonjs2" // 包需要被module.exports，这就要用到common
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: "./dist",
  },
  externals:[nodeExternals()], // nodeExternals 使得打包的组件中不包括任何 node_modules 里面的第三方组件，起到减小体积的作用。
  plugins,
};
