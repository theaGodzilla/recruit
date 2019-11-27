const express = require('express');
const Router = express.Router();

const deliveryModel = require('../model/deliveryModel.js');
const util = require('../utils/utils.js')

//投递
Router.post('/addr', (req, res) => {
  let { jid, gid, sname, xuehao, qname, pass, date, title } = req.body
  deliveryModel.insertMany({
    jid, gid, sname, xuehao, qname, pass: pass ? pass : 0, date, title, yao: '等待审批'
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//验证是否存投递过
Router.post('/getxg', (req, res) => {
  let { xuehao, gid } = req.body;
  deliveryModel.find({ xuehao, gid })
    .then((data) => {
      if (data.length >= 1) { return res.send('yes') }
      res.send('no')
    })
})
//根据学号获取数据
Router.post('/finddelivery', (req, res) => {
  let { xuehao, pass } = req.body;
  console.log(pass)
  deliveryModel.find(pass ? { xuehao, pass } : { xuehao })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//根据id获取数据
Router.post('/findd', (req, res) => {
  let { id } = req.body;
  console.log(id);
  deliveryModel.find({ _id: id })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util, sendData(-1, 'no', err))
    })
})

Router.post('/findall', (req, res) => {
  let value = req.body.job;
  let target = Number(req.body.target);//目标页
  let pagesize = Number(req.body.pageSize);
  let total = 0;
  deliveryModel.find(value ? { $or: [{ sname: { $regex: value } }, { qname: { $regex: value } }, { title: { $regex: value } }, { companyFullname: { $regex: value } }] } : null)
    .then((datas) => {
      total = datas.length;
      deliveryModel.find(value ? { $or: [{ sname: { $regex: value } }, { qname: { $regex: value } }, { title: { $regex: value } }, { companyFullname: { $regex: value } }] } : null).limit(pagesize).skip((target) * pagesize)
        .then((data) => {
          let array = { total, data }
          res.send(util.sendData(0, 200, array))
        })
    })
    .catch((err) => {
      res.send(util.sendData(-1, 500, err))
    })
})
//更新1
Router.post('/one', (req, res) => {
  // let id = req.body.id
  let { _id } = req.body;
  if (!_id) { res.send(util.sendData(-1, '参数错误', null)) }
  deliveryModel.updateOne({ _id }, {
    $set: {
      pass: 1,
      yao: '邀请面试'
    }
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', null))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', null))
    })
})

Router.post('/many', (req, res) => {
  let ids = req.body.ids;
  if (ids.length <= 0) { res.send(util.sendData(-1, '参数错误', null)) }
  deliveryModel.updateMany({ _id: { $in: ids } }, {
    $set: {
      pass: 1,
      yao: '邀请面试'
    }
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', null))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', null))
    })
})

module.exports = Router;







