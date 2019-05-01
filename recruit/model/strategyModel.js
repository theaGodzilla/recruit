const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let strategySchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, },
  title: { type: String, },
  content: { type: String, },
  date: { type: String, },
})



let strategyModel = mongoose.model('strategy', strategySchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = strategyModel;