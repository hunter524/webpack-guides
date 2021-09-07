//通过返回一个函数，由函数动态的返回config 对象的配置
// env 表示当前环境变量的一个 Object
// args 也表示为一个 Object 的环境变量
module.exports = function (env = {}, args) {
    console.log(JSON.stringify(env))
    console.log(`value ${JSON.stringify(args)}`)
    return {}
}
