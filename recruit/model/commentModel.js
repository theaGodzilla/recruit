const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
  pid: { type: String, required: true },
  xuehao: { type: String },
  sname: { type: String },
  // title: { type: String },
  content: { type: String },
  date: { type: String  }
})



let commentModel = mongoose.model('comment', commentSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = commentModel;