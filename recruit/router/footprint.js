const express = require('express');
const Router = express.Router();

const footprintModel = require('../model/footprintModel.js');
const util = require('../utils/utils.js')

//浏览
Router.post('/addf', (req, res) => {
  let { qid, xuehao, qname, title, content, date, type } = req.body
  footprintModel.insertMany({
    qid, xuehao, qname, title, content, date, type
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//验证
Router.post('/getf', (req, res) => {
  let { xuehao, qid } = req.body;
  footprintModel.find({ xuehao, qid })
    .then((data) => {
      if (data.length >= 1) { return res.send('yes') }
      res.send('no')
    })
})
//根据学号获取数据
Router.post('/findfootprint', (req, res) => {
  let { xuehao, type } = req.body;
  footprintModel.find({ xuehao, type })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//根据去掉
Router.post('/delfootprint', (req, res) => {
	let { xuehao, qid } = req.body;
	// if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
	footprintModel.deleteOne({ xuehao, qid })
		.then((data) => {
			res.send(util.sendData(0, 'ok', null))
		})
		.catch((err) => {
			res.send(util.sendData(-1, 'no', null))
		})
})
module.exports = Router;







