const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let footprintSchema = new Schema({
  qid: { type: Number, required: true },
  xuehao: { type: String, required: true },
  qname: { type: String, },
  title: { type: String, },
  content: { type: String, },
  date: { type: String, },
  type: { type: Number, required: true },
})



let footprintModel = mongoose.model('footprint', footprintSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = footprintModel;