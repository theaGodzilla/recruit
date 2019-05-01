const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let stratSchema = new Schema({
  id: { type: String },
  title: { type: String, },
  year: { type: String, },
  infoLite: { type: String, },
  isStar: { type: String, },
  image: { type: String, },
  companys: { type: Array },
  count: { type: Number },
  up: { type: Number },
  info: { type: String }
})

let stratModel = mongoose.model('strat', stratSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model
// sid: { type: Number, required: true },
// name: { type: String, },
// title: { type: String, },
// content: { type: String, },
// date: { type: String, },
module.exports = stratModel;