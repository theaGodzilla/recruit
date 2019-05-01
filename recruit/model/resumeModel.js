const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resumeSchema = new Schema({
  jid: { type: Number, required: true },
  title: { type: String, required: true },
  job: { type: String, },
  name: { type: String, },
  education: { type: String, },
  major: { type: String, },
  emaill: { type: String, },
  phone: { type: String, },
  address: { type: String, },
  date: { type: String, },
  work: { type: String, },
  school: { type: String, },
  summary: { type: String, },
})



let resumeModel = mongoose.model('resume', resumeSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = resumeModel;