const express=require('express');
const Router=express.Router();


const qiyModel=require('../model/qiyModel.js');
const utli=require('../admin/utli/utli.js');


//查询企业信息
Router.post('/findqiy',(req,res)=>{
    let pagesize=Number(req.body.pagesize);//第一页几条
    let target=Number(req.body.target);//共几页
    let total=0;
    let nowtime=req.body.nowtime;
    // console.log(nowtime)
      qiyModel.find()

    // 第一页3条数据,跳过第一页的3条数据
    // console.log(req.body)
    .then((res) => {
        total=res.length;
        // console.log(res)
        return  qiyModel.find().limit(pagesize).skip((target-1)*pagesize).sort({"nowtime":-1})
    })
    .then((data) => {
        let array={total:total,studerlist:data}
        res.send(utli.sendData(0,'请求ok',array))
        })
        .catch((err) => {

            res.send(utli.sendData(-1, '请求错误', null))
        })
})




//模糊查询

Router.post('/fqiy',(req,res)=>{

    let job=req.body.job;
    let target=Number(req.body.target);//目标页
    let pagesize=Number(req.body.pageSize)
    let total=0;
    qiyModel.find({$or:[{job:{$regex:job}},{address:{$regex:job}},{gz:{$regex:job}}]})
        .then((rrr)=>{
            total=rrr.length;
            qiyModel.find({$or:[{job:{$regex:job}},{major:{$regex:job}},{gz:{$regex:job}}]}).limit(pagesize).skip((target-1)*pagesize)
            .then((data)=>{
                let array={total:total,studerlist:data}
               res.send(utli.sendData(0,'模糊查询成功',array))
            })
        })
        .catch((err)=>{
            res.send(utli.sendData(-1,'模糊查询失败',null))
        })
    }) 






    Router.post('/delqiy',(req,res)=>{
        let id=req.body.id;

        if(!id){
            res.send(utli.sendData(-1, '请求错误', null))
        }
        qiyModel.deleteMany({_id:id})
        .then((data)=>{
            res.send(utli.sendData(0,'删除成功',data))
            // console.log(data)
        })
        .catch((err)=>{
            res.send(utli.sendData(-1,'删除失败',null))
        })
    
    });



//根据职位和城市模糊查询
Router.post('/yao',(req,res)=>{
  
    let zewei=req.body.zewei;  ///职位
    let city=req.body.city;    //城市
    qiyModel.find({$and:[{job: {$regex:zewei}},{address:{$regex:city}}]})
    .then((data)=>{

        res.send(utli.sendData(0,'查询成功',data))
    })
    .catch((err)=>{
        res.send(utli.sendData(-1,'查询失败',null))
    })

})


//根据id获取数据
Router.post('/byId',(req,res)=>{
    let id=req.body.ID;
    // console.log(id)
    qiyModel.find({_id:id})
    .then((data)=>{
        res.send(utli.sendData(0,'查询成功',data))
    })
    .catch((err)=>{
        res.send(utli,sendData(-1,'查询失败'),null)
    })
})








//插入企业信息
    Router.post('/addqiy',(req,res)=>{
        // console.log(req.body);
        let{job,address,time,gz,company,ctype,like,zw,xueli,yq,xinxi,nowtime}=req.body;
           qiyModel.insertMany({
               job,address,time,gz,company,ctype,like,zw,xueli,yq,xinxi,nowtime
            })
        .then((data)=>{
            // console.log(data)
            res.send(utli.sendData(0,'数据插入成功',data));
        
        })
        .catch((err)=>{
      
            res.send(utli.sendData(-1,'数据插入失败',null));       
        })
    })
    

//分类查询
Router.post('/type',(req,res)=>{
    let{text}=req.body;
    qiyModel.find({company:text}).limit(8)
    .then((data)=>{
        res.send(utli.sendData(0,'查询成功',data))
    })
    .catch((err)=>{
        res.send(utli.sendData(-1,'查询失败',null))
    })
})

//根据输入框模糊查询
Router.post('/val',(req,res)=>{
    console.log(req.body)
    let job=req.body.va;
    console.log(job)
    qiyModel.find({$or:[{job:{$regex:job}},{address:{$regex:job}}]})
        .then((data)=>{
            // console.log(data)
               res.send(utli.sendData(0,'模糊查询成功',data))
        })
        .catch((err)=>{
          
            res.send(utli.sendData(-1,'模糊查询失败',null))
        })
    })



    module.exports=Router;