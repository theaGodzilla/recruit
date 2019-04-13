const mongoose=require('mongoose')
let Schema = mongoose.Schema;

let comSchema=new Schema({
	name:{type:String,required:true},
	img:{type:String,required:true},
	type:{type:String,required:true},
	price:{type:Number,required:true},
	stock:{type:Number,required:true},
	place:{type:String,required:true},
	time:{type:String}
})

let commodel=mongoose.model('com',comSchema);

module.exports=commodel;
