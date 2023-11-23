const xss = require('xss')
const {exec} = require('../db/mysql')

const getList = async (author, keyword) => {
    let sql = `select * from blog where 1=1 `
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    console.log('sql->', sql)

    return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blog where id = '${id}'`
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    // blogData是一个博客对象，包含title、content、author属性
    // 防止xss攻击
    const title = xss(blogData.title)
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blog(title, content, createtime, author)
        values('${title}', '${content}', ${createTime}, '${author}');
    `

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData是一个博客对象，包含title、content属性
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blog set title = '${title}', content = '${content}' where id = ${id};
    `

    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    // id 就是要删除博客的id
    const sql = `delete from blog where id = ${id} and author = '${author}';`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}