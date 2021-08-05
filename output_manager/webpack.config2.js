const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 可以在 package.json 的 script 标签中指定使用 webpack.config2.js 进行 webpack 项目的构建
module.exports = {
  entry: {
    index: './src/index.js',
    // 不设置该 entry 则只会打包出一个 Bundle
    print: './src/print.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
