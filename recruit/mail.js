'use strict';
const nodemailer = require('nodemailer');

// nodemailer.createTestAccount((err, account) => {
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: 'qq',
	port: 465, // SMTP 端口
	secureConnection: true, // true for 465, false for other ports
	auth: {
		user: "398715871@qq.com", // 默认邮箱
		pass: 'fzhlasxdbfrxbhdi' // //smtp 授权码
	}
});

function sendmail(mail, msg) {
	return new Promise((resolve, reject) => {
		// 发送邮件相关信息
		console.log(mail)
		let mailOptions = {
			from: '398715871@qq.com', // sender address
			to: mail, // list of receivers
			subject: '网上招聘系统管理员邮箱验证', // Subject line
			text: '验证码为'+msg+'，60秒后重新获取。' // plain text body
			//html: '<b>Hello world?</b>' // html body
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if(error) {
				reject(error)
			}
			resolve('ok')
		})
	})
}
//sendmail('398715871@qq.com', '123')
    module.exports={sendmail};
//});