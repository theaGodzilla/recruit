// 要改的: 实例化这个方法下的name和poss,这个要看你数据user.js模块里name和poss是怎么命名的     

const  mongoose=require('mongoose');//调用第三方插件
let Schema=mongoose.Schema;//使用mongoose的Schema方法

let studerSchema=new Schema({       //实例化这个方法
    name:{type:String}, //姓名
    xuehao:{type:String},//学号
    mima:{type:String},  //密码
    email:{type:String,required:true},  
    pass:{type:String},
    language:{type:String},//精通语言
    major:{type:String},//专业
    job:{type:String},   //求职意向
    like:{type:String},  //理想薪资
    xueli:{type:String}, //学历
    city:{type:String},//城市

})

let studermodel=mongoose.model('studer', studerSchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports=studermodel;