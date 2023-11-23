// 环境参数
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: '192.168.1.102',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog',
        database_seq: 'myblog_sequelize'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '192.168.1.102'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: '192.168.1.102',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog',
        database_seq: 'myblog_sequelize'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '192.168.1.102'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}