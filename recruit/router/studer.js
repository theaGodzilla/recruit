const express=require('express');
const Router=express.Router();

const studerModel=require('../model/studerModel.js');
const mail=require('../admin/index.js');
const utli=require('../admin/utli/utli.js');




//插入学生的信息    (保留))
Router.post('/studer',(req,res)=>{
    // console.log(req)
    let{name,xuehao,mima,email,language,major,job,like,city}=req.body;
    studerModel.insertMany({name,xuehao,mima,email,language,major,job,like,city})
    .then((data)=>{
        // console.log(data)
        res.send(utli.sendData(0,'数据插入成功',data));
    })
    .catch((err)=>{
    //    console.log(err)
        res.send(utli.sendData(-1,'数据插入失败',null));       
    })
})





// 查找学生信息(保留)
Router.use('/findstuder',(req,res)=>{
    let pagesize=Number(req.body.pagesize);//第一页几条
    let target=Number(req.body.target);//目标页
    let total=0;
    studerModel.find()
    // 第一页3条数据,跳过第一页的3条数据
    .then((res) => {
        total=res.length;
        return  studerModel.find().limit(pagesize).skip((target-1)*pagesize)
    })
    .then((data) => {
        // console.log(data)
        let array={total:total,studerlist:data}
        res.send(utli.sendData(0,'请求ok',array))
        })
        .catch((err) => {
    
            res.send(utli.sendData(-1, '请求错误', null))
        })
})

//登录
Router.post('/sreg',(req,res)=>{
    let {xuehao,mima}=req.body;
     studerModel.find({xuehao,mima})
   .then((data)=>{
       if(data.length>=1){
            res.send(utli.sendData(0,'查询成功',data))
       }
       res.send('登录失败')
      
   })
  
})




//删除学生(保留)
Router.post('/delstuder',(req,res)=>{
    let id=req.body.id;
    if(!id){
        res.send(utli.sendData(-1, '请求错误', null))
    }
    studerModel.deleteMany({_id:id})
    .then((data)=>{
        res.send(utli.sendData(0,'删除成功',data))

    })
    .catch((err)=>{
		res.send(util.sendData(-1,'删除失败',null))
	})

});


// 获取学生id
Router.use('/getstuderID',(req,res)=>{
    let id=req.body.id;
    if(!id){
        res.send(utli.sendData(-1,'参数错误',null))
    }
    studerModel.find({_id:id})
    .then((data)=>{
        res.send(utli.sendData(0,'查询成功',data))
    })
    .catch((err)=>{
        res.send(utli.sendData(-1,'查询失败',null))
    })

})





//更新学生数据(保留)
Router.post('/upstuder',(req,res)=>{
   
    let{xuehao,email,language,major,job,like,xueli,city}=req.body;
        studerModel.updateMany({xuehao:xuehao},{
            $set: {
                email: email,
                language: language,
                job:job,
                major:major,
                job:job,
                like:like,
                xueli:xueli,
                city:city
            }
        })
        .then((aaa)=>{
            // console.log(123)
            res.send(utli.sendData(0,'已更新',null))
        })
        .catch((err)=>{
            res.send(utli,sendData(-1,'更新失败',null))
        })
    
   
})

//根据id更新
Router.post('/upID',(req,res)=>{
    let{id,name,xuehao,email,language,major,job,like,city}=req.body;
        // studerModel.updateMany({xuehao:xuehao},{email,language,major,job,like,xueli,city})
        studerModel.updateMany({_id:id},{
            $set: {
                name:name,
                xuehao:xuehao,
                email: email,
                language: language,
                job:job,
                major:major,
                like:like,
                city:city
            }
        })
        .then((aaa)=>{
            res.send(utli.sendData(0,'已更新',null))
        })
        .catch((err)=>{
            res.send(utli,sendData(-1,'更新失败',null))
        })
    
   
})






//模糊查询(保留)

Router.use('/fstuder',(req,res)=>{

let job=req.body.job;
let target=Number(req.body.target);//目标页
let pagesize=Number(req.body.pageSize)
let total=0;
   studerModel.find({$or:[{job:{$regex:job}},{major:{$regex:job}}]})
    .then((rrr)=>{
        total=rrr.length;
        studerModel.find({$or:[{job:{$regex:job}},{major:{$regex:job}}]}).limit(pagesize).skip((target-1)*pagesize)
        .then((data)=>{
            let array={total:total,studerlist:data}
   
           res.send(utli.sendData(0,'模糊查询成功',array))
        })
    })
    .catch((err)=>{
   
        res.send(utli.sendData(-1,'模糊查询失败',null))
    })



})


module.exports=Router;
