const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let collectionSchema = new Schema({
  sid: { type: String, required: true },
  xuehao: { type: String },
  qname: { type: String },
  title: { type: String },
  content: { type: String },
  type: { type: Number }
})



let collectionModel = mongoose.model('collection', collectionSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = collectionModel;