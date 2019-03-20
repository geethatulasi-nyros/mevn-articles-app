const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const articleSchema=new Schema({
	title:{type:'String'},
	description:{type:'String'},
	image:{type:'String'},
	category:{type:'String'},
	date:{type:'Date',default:Date.now,required:true},

});


module.exports = mongoose.model('Article',articleSchema);
