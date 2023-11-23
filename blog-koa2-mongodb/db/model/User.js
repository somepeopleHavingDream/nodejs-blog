// 对应 User 集合

const mongoose = require('../db')

// 用 Schema 定义数据规范
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        // 必须
        required: true,
        // 唯一，不能重复
        unique: true
    },
    password: String,
    realname: String
}, {
    timestamps: true
})

// Model 对应 collection
const User = mongoose.model('user', UserSchema)

module.exports = User