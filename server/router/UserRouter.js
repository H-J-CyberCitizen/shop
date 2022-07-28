const express = require('express')
const router = express.Router()
const sql = require('mysql')
const jwt = require("jsonwebtoken")
const key = '**ShopCar**'
const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'shop'
}
// 创建连接池
const pool = sql.createPool(config)
router.use(express.urlencoded({ extended: false }))

router.post('/login', (req, res) => {
    let username = req.user.username
    let password = req.body.password
    pool.createPool((err, connection) => {
        if (err) {
            res.send({
                status: -1,
                msg: '连接数据库失败'
            })
        }
        let query = "select password from usershopcar where username = " + connection.escape(username)
        connection.query(query, (err, result) => {
            if (err) {
                res.send({
                    status: -1,
                    msg: '连接数据库失败'
                })
            }
            if (result === password) {
                res.send({
                    status: 0,
                    msg: '登陆成功！',
                    token:jwt.sign({username},key,{expiresIn:"3600s"})
                })
            }
        })
    })
})

router.get('/getList', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.send({
                status: -1,
                msg: '连接数据库失败'
            })
        }
        let query = 'select shopList from usershopcar where user =' + connection.escape(req.username)
        connection.query(query, (err, result) => {
            if (err) {
                console.log('读取数据库失败！');
                res.send({
                    status: -1,
                    msg: '读取数据出错!'
                })
            }

            let query2 = "SELECT * FROM goodlist WHERE FIND_IN_SET(id,'"
            let query3 = "')"
            result.forEach(e => {
                query2 = query2 + e.toString() + ","
            });
            query2 = query2.substring(0, query2.lastIndexOf(','));
            query2 = query2 + query3

            connection.query(query2, (err, result) => {
                if (err) {
                    console.log('读取数据库失败！');
                    res.send({
                        status: -1,
                        msg: '读取数据出错!'
                    })
                    res.send({
                        status: 0,
                        msg: '读取成功！',
                        data: result
                    })
                }
            })
        })
    })
})

module.exports = router
