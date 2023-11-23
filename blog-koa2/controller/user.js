const {exec, escape} = require('../db/mysql')
const {genPassword} = require('../util/cryp')

const login = async (username, password) => {
    // 生成加密密码
    // password = genPassword(password)

    // 防止sql注入
    username = escape(username)
    password = escape(password)


    const sql = `
        select username, realname from user where username = ${username} and password = ${password};
    `

    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}