const express = require('express');
const Router = express.Router();

const comModel = require('../model/comModel.js');
const util = require('../utils/utils.js')

Router.post('/comlist', (req, res) => {
	//实现分页 
	let pagesize = Number(req.body.pagesize);
	let target = Number(req.body.target);
	let total = 0;
	comModel.find()
		.then((res) => {
			total = res.length
			return comModel.find().limit(pagesize).skip((target - 1) * pagesize)
		})
		.then((data) => {
			let array = { total: total, comlist: data }
			res.send(util.sendData(0, '请求ok', array))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '请求错误', err))
		})
})
//添加商品信息
Router.post('/addcom', (req, res) => {
	let { name, img, type, price, stock, place, time } = req.body
	comModel.insertMany({ name, img, type, price, stock, place, time })
		.then((data) => {
			res.send(util.sendData(0, '添加商品信息ok', data))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '添加商品信息失败', null))
		})
})
//更新商品信息
Router.post('/updatecom', (req, res) => {
	let id = req.body.id
	if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
	let { name, img, type, price, stock, place, time } = req.body
	comModel.update({ _id: id }, {
		$set: {
			name: name,
			img: img,
			type: type,
			price: price,
			stock: stock,
			place: place,
			time: time
		}
	})
		.then((data) => {
			res.send(util.sendData(0, '修改成功', null))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '修改失败', null))
		})
})
//删除某一商品信息
Router.post('/delcom', (req, res) => {
	let id = req.body.id
	if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
	comModel.deleteOne({ _id: id })
		.then((data) => {
			res.send(util.sendData(0, '删除成功', data))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '删除失败', null))
		})
})

//模糊查询
Router.post('/mh', (req, res) => {
	let name = req.body.name
	let pagesize = Number(req.body.pagesize);
	let target = Number(req.body.target);
	let total = 0
	if (!name) { res.send(util.sendData(-1, '请输入搜索内容', null)) }
	comModel.find({ name: { $regex: name } })
		.then((res) => {
			total = res.length
			return comModel.find({ name: { $regex: name } }).limit(pagesize).skip((target - 1) * pagesize)
		})
		.then((data) => {
			let array = { total: total, comlist: data }
			res.send(util.sendData(0, '查询ok', array))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '查询no', null))
		})
})
//通过id获取商品
Router.post('/getcomId', (req, res) => {
	let id = req.body.id
	if (!id) { res.send(util.sendData(-1, '参数错误', null)) }
	comModel.find({ _id: id })
		.then((data) => {
			res.send(util.sendData(0, '查询ok', data))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '查询失败', null))
		})
})

//根据id删除多条商品信息
Router.post('/deletemanycom', (req, res) => {
	let arr = req.body.ids;
	var ids = JSON.parse(arr)
	console.log(ids.ids);
	if (arr.length <= 0) { res.send(util.sendData(-1, '参数错误', null)) }
	//  bookModel.remove([{_id:'5bdaebcaaea2b33c2cf96dc0'},{_id:'5bdba553b5485f191034313f'}])
	comModel.remove({ _id: { $in: ids.ids } })
		.then((data) => {
			res.send(util.sendData(0, '删除成功', data))
		})
		.catch((err) => {
			console.log(err)
			res.send(util.sendData(-1, '删除失败', null))
		})
})

//排序
Router.post('/sortcom', (req, res) => {
	let one = Number(req.body.one);
	let pagesize = Number(req.body.pagesize);
	let target = Number(req.body.target);
	let total = 0
	comModel.find().sort({ price: one })
		.then((res) => {
			total = res.length
			return comModel.find().sort({ price: one }).limit(pagesize).skip((target - 1) * pagesize)
		})
		.then((data) => {
			let array = { total: total, comlist: data }
			res.send(util.sendData(0, '请求ok', array))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '请求错误', null))
		})
})

Router.post('/mhsortcom', (req, res) => {
	let name = req.body.name
	let one = Number(req.body.one);
	let pagesize = Number(req.body.pagesize);
	let target = Number(req.body.target);
	let total = 0
	comModel.find({ name: { $regex: name } }).sort({ price: one })
		.then((res) => {
			total = res.length
			return comModel.find({ name: { $regex: name } }).sort({ price: one }).limit(pagesize).skip((target - 1) * pagesize)
		})
		.then((data) => {
			let array = { total: total, comlist: data }
			res.send(util.sendData(0, '请求ok', array))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '请求错误', null))
		})
})

module.exports = Router;







