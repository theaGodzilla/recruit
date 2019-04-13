// 'use strict';
const nodemailer=require('nodemailer');


let transporter = nodemailer.createTransport({
    service:'qq',
      port:465,
      secureConnection:true,
      auth:{
          user:'916176349@qq.com',
          pass:'hfugefucjvzfbece'
      }

});




function sendMail(mail,msg){
    return new Promise((resolve,reject)=>{
        let mainOptions={
            from:"916176349@qq.com",//谁发
            to:mail,    //给谁
            subject:'hello',
            text:msg
            // html:'<b>你好啊</b>'
        };
        transporter.sendMail(mainOptions,(error,info)=>{
            if(error){
                reject(error)
            }resolve('ok')
      });
    })
}
// sendMail('916176349@qq.com','你好')
module.exports={sendMail};