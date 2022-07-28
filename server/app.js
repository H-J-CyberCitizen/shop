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
app.use()
app.listen('8080',()=>{
    console.log("Running at http://localhost:8080");
})
