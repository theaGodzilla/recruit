const express = require('express');
const Router = express.Router();

const sssModel = require('../model/sssModel.js');
const util = require('../utils/utils.js')

Router.post('/findSss', (req, res) => {
  let type = req.body.type;
  let value = req.body.job;
  let target = Number(req.body.target);//目标页
  let pagesize = Number(req.body.pageSize);
  let total = 0;
  sssModel.find(value ? { $or: [{ companyShortname: { $regex: value } }, { title: { $regex: value } }, { city: { $regex: value } }, { companyFullname: { $regex: value } }] } : null).sort(type == '收藏最多' ? { max_salary: -1 } : type == '投递最多' ? { min_salary: -1 } : null)
    .then((datas) => {
      total = datas.length;
      sssModel.find(value ? { $or: [{ companyShortname: { $regex: value } }, { title: { $regex: value } }, { city: { $regex: value } }, { companyFullname: { $regex: value } }] } : null).sort(type == '收藏最多' ? { max_salary: -1 } : type == '投递最多' ? { min_salary: -1 } : null).limit(pagesize).skip((target) * pagesize)
        .then((data) => {
          let array = { total, data }
          res.send(util.sendData(0, 200, array))
        })
    })
    .catch((err) => {
      res.send(util.sendData(-1, 500, err))
    })
})
//根据id获取数据
Router.post('/findsid', (req, res) => {
  let id = req.body.id;
  console.log(id)
  sssModel.find({ id: id })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})

//添加招聘信息
Router.post('/addsss', (req, res) => {
  let { title, companyFullname, days_a_week, salaryText, activeTime, workerNumber, educationText, city, content } = req.body
  sssModel.insertMany({ title, companyFullname, days_a_week, salaryText, activeTime, workerNumber, educationText, city, content })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', null))
    })
})
//更新招聘信息
Router.post('/updatesss', (req, res) => {
  // let id = req.body.id
  let { _id, title, companyFullname, days_a_week, salaryText, activeTime, workerNumber, educationText, city, content } = req.body;
  if (!_id) { res.send(util.sendData(-1, '参数错误', null)) }
  sssModel.updateOne({ _id }, {
    $set: {
      title: title,
      companyFullname: companyFullname,
      days_a_week: days_a_week,
      salaryText: salaryText,
      activeTime: activeTime,
      workerNumber: workerNumber,
      educationText: educationText,
      city: city,
      content: content
    }
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', null))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', null))
    })
})
//删除某一商品信息
Router.post('/delsss', (req, res) => {
  let id = req.body.id
  if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
  sssModel.deleteOne({ _id: id })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', null))
    })
})
//根据id删除多条商品信息
Router.post('/deletemanysss', (req, res) => {
  let ids = req.body.ids;
  if (ids.length <= 0) { res.send(util.sendData(-1, '参数错误', null)) }
  sssModel.deleteMany({ _id: { $in: ids } })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
module.exports = Router;







