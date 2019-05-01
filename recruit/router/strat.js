const express = require('express');
const Router = express.Router();

const stratModel = require('../model/stratModel.js');
const util = require('../utils/utils.js')

//添加信息
Router.post('/addstrat', (req, res) => {
  // let jid = req.body.sid
  let { id, title, year, infoLite, isStar, image, companys, count, up, info } = req.body.info
  stratModel.insertMany({
    id, title, year, infoLite, isStar, image, companys, count, up, info
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//更新信息
Router.post('/updatestrat', (req, res) => {
  let id = req.body.id
  if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
  let { title, year, infoLite, isStar, image, companys, count, up, info } = req.body.info
  stratModel.update({ _id: id }, {
    $set: {
      id: id,
      title: title,
      year: year,
      infoLite: infoLite,
      isStar: isStar,
      image: image,
      companys: companys,
      count: count,
      up: up,
      info: info,
    }
  })
    .then((data) => {
      res.send(util.sendData(0, '修改成功', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, '修改失败', null))
    })
})
//根据id获取数据
Router.post('/findstrat', (req, res) => {
  stratModel.find()
    .then((data) => {
      res.send(util.sendData(0, '查询成功', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, '查询失败', err))
    })
})
module.exports = Router;







