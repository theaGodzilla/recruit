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
  sssModel.find(value ? { $or: [{ companyShortname: { $regex: value } },{ title: { $regex: value } }, { city: { $regex: value } }, { companyFullname: { $regex: value } }] } : null).sort(type == '收藏最多' ? { max_salary: -1 } : type == '投递最多' ? { min_salary: -1 } : null)
    .then((datas) => {
      total = datas.length;
      sssModel.find(value ? { $or: [{ companyShortname: { $regex: value } },{ title: { $regex: value } }, { city: { $regex: value } }, { companyFullname: { $regex: value } }] } : null).sort(type == '收藏最多' ? { max_salary: -1 } : type == '投递最多' ? { min_salary: -1 } : null).limit(pagesize).skip((target - 1) * pagesize)
        .then((data) => {
          let array = { total, data }
          res.send(util.sendData(0, 200, array))
        })
    })
    .catch((err) => {
      res.send(util.sendData(-1, '模糊查询失败', null))
    })
})

module.exports = Router;







