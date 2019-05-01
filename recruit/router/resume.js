const express = require('express');
const Router = express.Router();

const resumeModel = require('../model/resumeModel.js');
const util = require('../utils/utils.js')

//添加信息
Router.post('/addresume', (req, res) => {
  let jid = req.body.sid
  let { title, job, name, education, major, emaill, phone, address, date, work, school, summary } = req.body.info
  resumeModel.insertMany({
    jid, title, job, name, education, major, emaill, phone, address, date, work, school, summary
  })
    .then((data) => {
      res.send(util.sendData(0, '添加简历信息ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, '添加简历信息失败', err))
    })
})
//更新信息
Router.post('/updateresume', (req, res) => {
  let id = req.body.id
  if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
  let { title, job, name, education, major, emaill, phone, address, date, work, school, summary } = req.body.info
  resumeModel.update({ _id: id }, {
    $set: {
      titl: title,
      job: job,
      name: name,
      education: education,
      major: major,
      emaill: emaill,
      phone: phone,
      address: address,
      date: date,
      work: work,
      school: school,
      summary: summary
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
Router.post('/findresume', (req, res) => {
  let id = req.body.id;
  console.log(id)
  resumeModel.find({ jid: id })
    .then((data) => {
      res.send(util.sendData(0, 'ok', data))
    })
    .catch((err) => {
      res.send(util.sendData(-1, 'no', err))
    })
})
module.exports = Router;







