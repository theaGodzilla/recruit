const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let deliverySchema = new Schema({
  jid: { type: String, required: true },
  gid: { type: String, required: true },
  sname: { type: String, },
  xuehao: { type: String, },
  qname: { type: String, },
  title: { type: String, },
  pass: { type: Number, },
  date: { type: String, },
  yao: { type: String, }
})



let deliveryModel = mongoose.model('delivery', deliverySchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = deliveryModel;