const xss = require('xss')
const Blog = require('../db/model/Blog')

const getList = async (author, keyword) => {
    // 动态拼接查询条件
    const whereOpt = {}
    if (author) whereOpt.author = author
    if (keyword) whereOpt.keyword = new RegExp(keyword)

    const list = await Blog.find(whereOpt).sort({ _id: -1 })
    return list
}

const getDetail = async (id) => {
    const blog = await Blog.findById(id)
    return blog
}

const newBlog = async (blogData = {}) => {
    // blogData是一个博客对象，包含title、content、author属性
    // 防止xss攻击
    const title = xss(blogData.title)
    const content = blogData.content
    const author = blogData.author

    const blog = await Blog.create({
        title,
        content,
        author
    })

    return {
        id: blog._id
    }
}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData是一个博客对象，包含title、content属性
    const title = blogData.title
    const content = blogData.content

    const blog = await Blog.findOneAndUpdate(
        { _id: id },
        { title, content },
        { new: true }
    )

    return blog != null
}

const delBlog = async (id, author) => {
    // id 就是要删除博客的id
    const blog = await Blog.findOneAndDelete({
        _id: id,
        author
    })
    return blog != null
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}