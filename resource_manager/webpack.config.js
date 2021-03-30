const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 使用资源处理器的优势是如下:可以将资源整合到功能模块内部,而不再依赖 assets 统一的资源文件目录
  // |- /assets
  // |– /components
  // |  |– /my-component
  // |  |  |– index.jsx
  // |  |  |– index.css
  // |  |  |– icon.svg
  // |  |  |– img.png
  module: {
    rules: [
      // 处理 css
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // 处理 图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // 处理字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
     ],
  },
};
