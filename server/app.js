const express = require('express')
const cors=require('cors')
const app=express()
app.use(cors())
const router=require('./router')

// 设置允许跨域访问该服务
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Headers', 'mytoken');
//     next();
//   });

app.use('/api',router)

app.listen('8080',()=>{
    console.log("Running at http://localhost:8080");
})
