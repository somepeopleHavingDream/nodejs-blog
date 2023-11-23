const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')

const ENV = process.env.NODE_ENV

const conf = {
    host: MYSQL_CONF.host,
    dialect: 'mysql'
}

if (ENV === 'production') {
    // 生产环境下使用连接池（process.env.NODE_ENV）
    conf.pool = {
        // 连接池中最大的连接数
        max: 5,
        // 连接池中最小的连接数
        min: 0,
        // 如果一个连接10s内没有被使用，则释放
        idle: 10 * 1000
    }
}


// 创建sequelize实例
const seq = new Sequelize(
    // 数据库名称
    MYSQL_CONF.database_seq,
    // 用户名
    MYSQL_CONF.user,
    // 密码
    MYSQL_CONF.password,
    conf
)

// 测试连接
seq.authenticate().then(() => {
    console.log('sequelize connect success!')
}).catch(() => {
    console.log('sequelize connect failed...')
})

module.exports = seq