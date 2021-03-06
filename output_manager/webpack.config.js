const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//__dirname 标记的是当前 package.json/webpack.config.js 的根目录
//__filename 标记的是当前 webpack.config.js 的路径
//实际上,上述两个都是 nodejs 环境内置的环境
console.log("__dirname",__dirname,"\n","__filename",__filename)
module.exports = {
  entry: {
    index: './src/index.js',
    // 不设置该 entry 则只会打包出一个 Bundle
    // print: './src/print.js',
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
