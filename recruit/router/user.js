const express=require('express');
const Router=express.Router();      //路由
const userModel=require('../model/userModel.js');
const mail=require('../admin/index.js');
const utli=require('../admin/utli/utli.js')


/**
 * @api {post} /user/reg/ 注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} name Users unique 用名.
 *
 * @apiSuccess {String} err 注册ok.
 * @apiSuccess {String} msg  注册失败.
 */


// //先注册(学号)管理员权利
// Router.post('/reg',(req,res)=>{
//     let {name,pass,code}=req.body;
//     // console.log(req.body)
//     userModel.find({name})
//     .then((data)=>{
//         if(data.length>=1){
//             return res.send(utli.sendData(-1,'用户已存在',null))
//         }
//         else{
//             if(obj[name]!==code){
//                 return res.send(utli.sendData(-1,'验证码错误',null))
//                 // console.log(err)
//             }
//             userModel.insertMany({name,pass})
//             .then((data)=>{
//               res.send('注册ok')
//              })
//             .catch((err)=>{
//                 // console.log(err)
//                 res.send('注册失败')
//             })
//         }
//     })
    
// })


/**
 * @api {post} /user/login/ 登录
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} name 用户名.
 * @apiParam {String} pass 用户密码.
 *
 * @apiSuccess {String} err 登录成功.
 * @apiSuccess {String} msg 登录失败.
 */

//登录
Router.post('/login',(req,res)=>{
    let {id,name,pass}=req.body
    // console.log(req.body)
    // userModel.insertMany({name,pass})
    userModel.find({id,name,pass})
    .then((data)=>{
       console.log(data)
       if(data.length>=1){
        //    return res.send('登录成功',data)
           return res.send(utli.sendData(0,'登录成功',data))
        }else{
            res.send('登录失败')
        }
    })
})


/**
 * @api {post} /user/email/ 获取邮箱验证码
 * @apiName email
 * @apiGroup User
 *
 * @apiParam {String} us Users unique ID.
 * @apiParam {String} pass Users unique ID.
 *
 * @apiSuccess {String} err Firstname of the User.
 * @apiSuccess {String} msg  Lastname of the User.
 */






let obj={};

// //获取邮箱验证码
Router.post('/email',(req,res)=>{
      let {name,pass,email,code}=req.body;
      if(obj[email]!==code){
          return res.send(utli.sendData(-1,'验证码错误',null))
    
      }
      userModel.update({pass})
      .then((resolve)=>{
        //   console.log(resolve)
          res.send(utli.sendData(0,'密码更改成功',null))
	   })
      .catch((err)=>{
          res.send(utli.sendData(-1,'密码跟改失败',null))
      })
})

/**
 * @api {post} /user/email/ 获取邮箱验证码
 * @apiName email
 * @apiGroup User
 *
 * @apiParam {String} email 用户邮箱
 *
 * @apiSuccess {String} err 验证码发送失败.
 * @apiSuccess {String} msg 验证码已发送.
 */

// //验证码
Router.post('/getcode',(req,res)=>{
    let {email}=req.body;
 
    if(!email||email==''){
        return  res.send(utli.sendData(-1,'参数错误',null))
    }
    let num1=parseInt(Math.random(0,1)*1000).toString();
    mail.sendMail(email,num1)
 
    .then((resolve)=>{
        obj[email]=num1
        // console.log(utli.sendData);
         res.send(utli.sendData(0,'验证码已发送',null))
    })
    .catch((err)=>{
        res.send(utli.sendData(-1,'验证码发送失败',null))
    })
})






module.exports=Router;