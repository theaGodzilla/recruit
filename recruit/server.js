

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path')
const db = require('./dbconnect.js')  //数据库连接



//post参数解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//静态文件开启
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './wj')));
app.use(express.static(path.join(__dirname, './admin')))
app.use(express.static(path.join(__dirname, './src')))
// app.use('/admin',express.static(path.join(__dirname,'./')))

//router
const user = require('./router/user.js'); //调用路由
app.use('/api/user', user)              //使用路由

//上传文件
const upimg = require('./router/upimg.js');
app.use('/api/upimg', upimg);

//学生
const studer = require('./router/studer.js');
app.use('/api/studer', studer);

//企业
const qiy = require('./router/qiy.js');
app.use('/api/qiy', qiy);

//实习生
const sss = require('./router/sss.js');
app.use('/api/sss', sss);

//实习生
const resume = require('./router/resume.js');
app.use('/api/resume', resume);

//投递管理
const delivery = require('./router/delivery.js');
app.use('/api/delivery', delivery);

// 收藏
const collection = require('./router/collection.js');
app.use('/api/collection', collection);

// 足迹
const footprint = require('./router/footprint.js');
app.use('/api/footprint', footprint);

// 求职攻略
const strategy = require('./router/strategy.js');
app.use('/api/strategy', strategy);

// 攻略收藏
const strat = require('./router/strat.js');
app.use('/api/strat', strat);

// 攻略收藏
const comment = require('./router/comment.js');
app.use('/api/comment', comment);

const upload = require('./router/upload.js')
const com = require('./router/com.js')

app.use('/api/upload', upload)
app.use('/api/com', com)

app.listen(9000, () => {
    console.log('服务器开启')
})