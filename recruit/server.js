

const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const path=require('path')
const db=require('./dbconnect.js')  //数据库连接



//post参数解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//静态文件开启
app.use(express.static(path.join(__dirname,'./wj')));
app.use('/admin',express.static(path.join(__dirname,'./admin')))
app.use(express.static(path.join(__dirname,'./src')))
// app.use('/admin',express.static(path.join(__dirname,'./')))

//router
const user=require('./router/user.js'); //调用路由
app.use('/api/user',user)              //使用路由

//上传文件
const upimg=require('./router/upimg.js');
app.use('/api/upimg',upimg);

//学生
const studer=require('./router/studer.js');
app.use('/api/studer',studer);

//企业
const qiy=require('./router/qiy.js');
app.use('/api/qiy',qiy);

app.listen(9000,()=>{
    console.log('服务器开启')
})