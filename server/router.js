const express = require('express')
const router = express.Router()
const sql = require('mysql')
const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'shop'
}

const pool = sql.createPool(config)
router.use(express.urlencoded({ extended: false }))

router.get('/getList', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
            res.send({
                status: -1,
                msg: '连接数据库失败'
            })
        }
        let query = 'select * from goodlist'
        connection.query(query, (err, result) => {
            if (err) {
                console.log('读取数据库失败！');
                res.send({
                    status: -1,
                    msg: '读取数据出错!'
                })
                connection.release()
            }
            res.send({
                status: 0,
                msg: '读取成功！',
                data: result
            })
            connection.release()
        })
    })


})

module.exports = router
