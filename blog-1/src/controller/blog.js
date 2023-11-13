const xss = require('xss')
const {exec} = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blog where 1=1 `
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    console.log('sql->', sql)

    // 返回promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blog where id = '${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
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

    return exec(sql).then(insertData => {
        // console.log('insertData is ', insertData)

        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData是一个博客对象，包含title、content属性
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blog set title = '${title}', content = '${content}' where id = ${id};
    `

    return exec(sql).then(updateData => {
        // console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    // id 就是要删除博客的id
    const sql = `delete from blog where id = ${id} and author = '${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}