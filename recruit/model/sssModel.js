const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let sssSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  city: { type: String, required: true },
  companyFullname: { type: String, },
  companyShortname: { type: String, },
  days_a_week: { type: String, },
  salaryText: { type: String, },
  activeTime: { type: String, },
  company_id: { type: Number, },
  canRegular: { type: Number, },
  workerNumber: { type: String, },
  is_deleted: { type: Number, },
  is_published: { type: Number, },
  educationText: { type: String, },
  categoryIds: { type: Array, },
  categoryNames: { type: Array, },
  max_salary: { type: Number, },
  min_salary: { type: Number, },
})



let sssModel = mongoose.model('sxs', sssSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports = sssModel;