const path               = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin")
// const  TerserPlugin = require("terser")

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

    // 指定第三方模块有效,指定 后 yarn dev 则无法启动,因为 package2.json 中 devDependencies 中没有指定 webpack-dev-server 的引用
    resolve: {
        descriptionFiles:["package.json"]
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
    ],

    // webpack server --devtool source-map --open --config webpack.config.js
    // webpack server 则为启动　devServer 使用　devServer 去识别该　config.js 中的　devServer 选项的配置
    // 通过 webpack 该命令行才会启动 devServer
    devServer: {/*dev 服务*/

        //devServer 的启动为内存编译,编译的文件处于内存中(并不会处于真实的 dist 目录下)
        //改处指定为 http 服务暴露的本地的其他文件
        contentBase: './src',

        hot: true,

        // 默认为 true devServer 注入通知更新的代码进入用户代码的 trunk 中
        // false 则采用 iframe 的方式进行更新操作
        inline: true,
        // 使用正则匹配命中路由

        // 设置为 true 则任意如 http://localhost/home http://localhost/user 均返回 index.html 单页应用的情况下,由应用自己根据 path 如何展示
        // historyApiFallback: true,

        // 通过 historyApiFallback 的 rewrite 配置,则可以指定什么路径加载什么文件
        // historyApiFallback: {
        //     rewrites: [
        //         // /user 开头的都返回 user.html
        //         {from: /^\/main/, to: '/main.css'},
        //         {from: /^\/main2/, to: '/main2.html'},
        //         // 其它的都返回 index.html
        //         {from: /./, to: '/index.html'},
        //     ]
        // },

        // 对于请求 devServer 的响应的请求头中均添加该字段
        headers: {
            "X-foo":"bar"
        },

        port:1234,

        // disableHostCheck:true,

        //open 配置首次编译完成之后是否默认打开页面
        //openPage 配置默认打开的页面地址
        openPage:"http://127.0.0.1:1234/main.js",

        https:false,
    },
//    webpack 的一些其他配置
//    devtool 配置　source-map 同时也需要引入　terser 插件　才能生成　source-map
    devtool:'source-map',

    optimization: {
        minimize: true,
    }
};
