const mongoose=require('mongoose');
let Schema=mongoose.Schema;

let  qiySchema=new Schema({
    job:{type:String,required:true}, 
    address:{type:String,required:true}, 
    time:{type:String,required:true},  
    gz:{type:String,required:true},
    company:{type:String,required:true},
    ctype:{type:String,required:true},
    like:{type:String,required:true}, 
    zw:{type:String,required:true},  
    xueli:{type:String,required:true},
    yq:{type:String,required:true}, 
    xinxi:{type:String,required:true},
    lx:{type:String},
    nowtime:{type:String}

})



let qiyModel=mongoose.model('qys', qiySchema);//将实例化这个方法变成模型
//参数一:集合的名字    参数二:schema对象 将schema对象变成model

module.exports=qiyModel;