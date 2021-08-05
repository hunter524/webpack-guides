const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // JavaScript 执行入口文件
    entry: './src/main.js',/*入口*/
    mode : 'production',
    //配置 dev server 的根目录
    //webpack serve --devtool source-map --open --config webpackextractcss.config.js (就得 SourceMap 可以通过 该命令指定 webpack 生成)
    //TODO:// 新的则需要通过 SourceMapDevToolPlugin/source-map-loader (plugin 和 Loader 配合使用)
    devServer: {/*dev 服务*/
        contentBase: './dist',
    },
    /*输出*/
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    //模块与Loader 指定处理流程
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                use : [MiniCssExtractPlugin.loader, "css-loader"],
            },
            // TODO:// 该插件好像并不是用来生成 Sourcemap 的
            // {
            //     test   : /\.js$/,
            //     enforce: "pre",
            //     use    : ["source-map-loader"],
            // },
        ]
    },
    //插件做一些扩展的事情
    plugins: [
        // 这个插件将之前存在于 js 中的 css 字符串单独提取出来作为单独的 css
        new MiniCssExtractPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name]_[contenthash:8].css`,
        }),
    ]
};
