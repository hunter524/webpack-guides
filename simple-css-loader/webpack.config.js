const path               = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
    // JavaScript 执行入口文件
    // 入口可以是 单个文件路径 /也可以是路径数组

    // 输出文件的 chunk 以 a.js 命名
    entry: {a:['./src/main.js'],b:['./src/main2.js']},

    // 输出文件的 chunk为 单个文件/多个文件路径数组 则以 main.js
    // entry: ['./src/main.js', './src/main2.js'],

    mode  : 'production',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        // 如果配置 output#filename 则会将 entry 文件按照 chunk 进行整理输出为 bundle.js
        // 如果存在多个 chunk 则不能将其放置到同一个 bundle.js 中(webpack 报错)
        // 只有一个 chunk 则可以将其放置到一个 bundle.js 中
        // filename: 'bundle.js',

        // 输出文件都放到 dist 目录下
        // 指定输出文件为指定 chunk 的 hash 值
        filename:"[chunkhash:8]-[id]-[hash].js",

        // 使用不同的 chunk 的名字作为输出的文件的名字
        // filename:"[name].js",

        //指定被其他文件引入的 chunk 生成的文件的名称
        chunkFilename:"aaa.js",
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                // loader 的执行规则是从数组的尾部向数组的头部进行执行
                test: /\.css$/,
                use : [
                    'style-loader',
                    {
                        loader: 'css-loader', options: {
                            import: true
                        }
                    }],
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title   : '主页',
            template: './src/index.html',
            //chunk 以 chunk 的名字作为命名
            chunks  : ['main',"a"],
            filename: path.resolve(__dirname, 'dist') + '/index.html',
            //在引入的 js 文件尾部添加 js 文件的 hash 查询字符串(避免浏览器的缓存陷阱)
            hash:true
        })
    ]
};
