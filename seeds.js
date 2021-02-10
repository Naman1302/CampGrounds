var mongoose = require('mongoose'),
	camp     = require('./models/campgrounds.js'),
	Comment  = require('./models/comments.js');
var	data     =[{
		name:"Jaisalmer",
		url:"https://breathedreamgo.com/wp-content/uploads/2019/11/bada-bagh-3181803_1280-2.jpg",
		description:"At the western edge of India, in the middle of the world’s second-largest desert, the fairytale kingdom of Jaisalmer appears, as if by magic, like a golden mirage in a desolate landscape."
	},
	{name:"Jaisalmer",
		url:"https://www.transindiatravels.com/wp-content/uploads/lake-palace-2.jpg",
		description:"the fairytale kingdom appears, as if by magic, like a golden mirage in a desolate landscape."
	},
	{name:"Udaipur",
		url:"https://www.transindiatravels.com/wp-content/uploads/udaipur2-1.jpg",
		description:"series of artificial lakes and is known for its lavish royal residences. City Palace, overlooking Lake Pichola, is a monumental complex of 11 palaces, courtyards and gardens, famed for its intricate peacock mosaics."
	}];

function seedDB(){
	//Remove Camps
	camp.remove({},function(err) {
	//if (err) {
	//	console.log(err);
	//}
	//else {
	//	  console.log("removed");
	//	   //Create Camps
	//	   data.forEach(function(seed) {
	//           camp.create(seed,function(err,camp) {
	//	          if (err) {
	//		      console.log(err);
	//	           }
	//	          else {
	//		      console.log("Added!!");
	//		              //Add Comment
	//		      	      Comment.create( {
	//		      		        text:"Plssss wisit this Palace",
	//		      		        author:"My Website"
	//		      	        },function(err,comments) {
	//		      		        if (err) {
	//		      			        console.log(err);
	//		      		        }
	//		      		        else{
	//		      			        camp.Comment.push(comments);
	//		      			        camp.save();
	//		      			        console.log("Comment Added!!!");
	//		      		        }
	//		      	        });
	//	            }
	//            });
    //     });
	//}
  });
}

module.exports = seedDB;
