const express=require('express');
const Router=express.Router();
const multer=require('multer');
const fs=require('fs');
const path=require('path');
let upload=multer({dest:'tmp/'})//设置临时保存图片路径


/**
 * @api {post} /upimg/img 文件上传
 * @apiName img
 * @apiGroup  upimg
 *
 * @apiParam {String}  test 单文件上传(single).

 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg  上传成功.
 * @apiSuccess {String} path  图片路径.
 */




Router.post('/img',upload.single('test'),(req,res)=>{
    // console.log(req.file);
    fs.readFile(req.file.path,(err,data)=>{
        if(err){
            return res.send('上传错误')
        }
        let filename=new Date().getTime()+parseInt(Math.random(0,1)*1000)+'.'+req.file.mimetype.split('/')[1];
        // console.log(filename)
        fs.writeFile(path.join(__dirname,'../wj/img',filename),data,(err)=>{
            if(err){
                return res.send('上传错误');
            }
            let array={
                err:0,
                msg:'上传ok',
                path:'img/'+filename
            }
            res.send(array);
        })
    })
    // res.send('上传ok')
})


module.exports=Router;