const express = require('express');
const Router = express.Router();

const collectionModel = require('../model/collectionModel.js');
const util = require('../utils/utils.js')

//收藏
Router.post('/addcoll', (req, res) => {
  let { sid, xuehao, qname, title, type, content } = req.body
  collectionModel.insertMany({
    sid, xuehao, qname, title, type, content
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//验证是否存收藏过
Router.post('/getxg', (req, res) => {
  let { xuehao, sid } = req.body;
  collectionModel.find({ xuehao, sid })
    .then((data) => {
      if (data.length >= 1) { return res.send('yes') }
      res.send('no')
    })
})
//根据id获取数据
Router.post('/findcoll', (req, res) => {
  let { xuehao, type } = req.body;
  collectionModel.find({ xuehao, type })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//根据去掉
Router.post('/delcollection', (req, res) => {
  let id = req.body.id;
  if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
  collectionModel.deleteOne({ _id: id })
    .then((data) => {
      res.send(util.sendData(0, 'ok', null))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', null))
    })
})
module.exports = Router;







