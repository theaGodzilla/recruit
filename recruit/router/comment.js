const express = require('express');
const Router = express.Router();

const commentModel = require('../model/commentModel.js');
const util = require('../utils/utils.js')

//评论
Router.post('/addcom', (req, res) => {
  let { pid, sname, xuehao, content, date, img } = req.body
  commentModel.insertMany({
    pid, sname, xuehao, content, date, img
  })
    .then((data) => {
      res.send(util.sendData(0, 'ok', null))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//
Router.post('/getcom', (req, res) => {
  let { xuehao, gid } = req.body;
  commentModel.find({ xuehao, gid })
    .then((data) => {
      if (data.length >= 1) { return res.send('yes') }
      res.send('no')
    })
})
//根据学号获取数据
Router.post('/findcomment', (req, res) => {
  let { xuehao, pass } = req.body;
  commentModel.find({ xuehao, pass })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
//根据id获取评论
Router.post('/findcom', (req, res) => {
  let { pid } = req.body;
  console.log(pid)
  commentModel.find({ pid })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util, sendData(-1, 'no', err))
    })
})
module.exports = Router;







