//通过返回一个函数，由函数动态的返回config 对象的配置
module.exports = function (env = {},args) {
    console.log(JSON.stringify(env))
    let array = new Array(args);
    array.forEach(value => {
        console.log(`value ${JSON.stringify(value)}`)
    })
    return{}
}
