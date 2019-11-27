// 要改的: 实例化这个方法下的name和poss,这个要看你数据user.js模块里name和poss是怎么命名的     

const mongoose = require('mongoose');//调用第三方插件
let Schema = mongoose.Schema;//使用mongoose的Schema方法

let userSchema = new Schema({       //实例化这个方法
  name: { type: String, required: true },
  pass: { type: String, required: true },
  stu: { type: Boolean },
  imageUrl: { type: String },
  nickname: { type: String },
  time: { type: String },
  email: { type: String },
  who: { type: Number },
})

let usermodel = mongoose.model('user', userSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = usermodel;

