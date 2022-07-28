const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: false }))

const jwt = require("jsonwebtoken")
const key = '**ShopCar**'

// express jwt解密
// const expressjwt = require("express-jwt")

// 链接数据库
const sql = require('mysql')
const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'shop'
}
const pool = sql.createPool(config)

router.post('/signup', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    pool.getConnection((err,connection)=>{
        if(err){
            res.send({
                status:-1,
                msg:'连接数据库失败！'
            })
        }
        let query="select usershopcar set username="+connection.escape(username)+" and password="+connection.escape(password)
        connection.query(query,(err,result)=>{
            if(err){
                res.send({
                    status:-1,
                    msg:'写入数据库失败！'
                })
            }
            res.send({
                status:0,
                msg:'注册成功！',
                token:jwt.sign({username},key,{expiresIn:'3600s'})
            })
        })
    })
})