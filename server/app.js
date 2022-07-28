const express = require('express')
const cors=require('cors')
const app=express()
app.use(cors())
const userRouter=require('./router/UserRouter')
const apiRouter=require('./router/api')

// 创建jwt验证：
const key = '**ShopCar**'
// express jwt解密
const expressjwt = require("express-jwt")
// =>  /api/ 
// api路径接口不需要验证
app.use(expressjwt({secret:key}).unless({path:/^\/api\//}))

app.use('/api',apiRouter)
app.use('/user',userRouter)
app.use((err,req,res,next)=>{
    if(err.name==='UnauthorizedError'){
        return res.send({
            status:401,
            msg:'无效token'
        })
    }
    res.send({
        status:500,
        msg:'未知错误'
    })
})
app.listen('8080',()=>{
    console.log("Running at http://localhost:8080");
})
