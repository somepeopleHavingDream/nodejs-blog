const Sequelize = require('sequelize')
const xss = require('xss')
const {Blog} = require('../db/model/Blog')

async function getList(author = '', keyword = '') {
    const whereOpt = {}
    if (author) whereOpt.author = author
    if (keyword) whereOpt.title = {
        [Sequelize.Op.like]: `%${keyword}%`
    }

    const list = await Blog.findAll({
        // 条件
        where: whereOpt,
        // 排序
        order: [
            ['id', 'desc']
        ]
    })

    return list.map(item => item.dataValues)
}

async function getDetail(id) {
    const blog = await Blog.findOne({
        // 条件
        where: { id }
    })
    if (blog == null) return null
    return blog.dataValues
}

async function newBlog(blogData = {}) {
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    // 系统自己赋值的属性，比较安全
    const author = xss(blogData.author)

    const blog = await Blog.create({
        title,
        content,
        author
    })

    return {
        id: blog.dataValues.id
    }
}

async function updateBlog(id, blogData = {}) {
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const res = await Blog.update(
        // 要更新的内容
        {
            title,
            content
        },
        // 条件
        {
            where: {
                id
            }
        }
    )

    return res[0] >= 1
}

async function delBlog(id, author) {
    const res = await Blog.destroy({
        // 条件
        where: {
            id,
            author
        }
    })
    return res >= 1
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}