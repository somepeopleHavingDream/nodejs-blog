const { genPassword } = require('../util/cryp')
const User = require('../db/model/User')

const login = async (username, password) => {
    // 生成加密密码
    // password = genPassword(password)

    const user = await User.findOne({
        username,
        password
    })

    return user == null ? {} : user
}

module.exports = {
    login
}