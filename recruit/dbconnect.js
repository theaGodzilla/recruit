// 这个模块要改的:mongodb://localhost:27017/haha   
//  haha要改,这个要在cmd里mongod,然后再开启mongo,执行show dbs命令,看你有多少数据库,有haha你就调用它


const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });
//链接数据库
let db = mongoose.connection;
//创建数据库对象
db.on('error',()=>{ console.log ('connection error:')})
//监听数据库链接错误
db.on('open', function() {
  console.log(" 数据库连接成功!")
});
 db.on('disconnected', function () {
     console.log('数据库连接断开');
 })