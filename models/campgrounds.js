var mongoose = require('mongoose');

var data = new mongoose.Schema({
	name        : String,
	url         : String,
	description : String,
	location    : String,
	lat		    : Number,
	lng         : Number,
	price       : String,
	Comment     :[
	   {
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	   }
	],
	rating:{
		type:Number,
		default:0
	},
	createdAt:{type:Date , default:Date.now},
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		username:String
	}
});

module.exports = mongoose.model( "camp" , data );