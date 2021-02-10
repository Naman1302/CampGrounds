var express = require('express');
var router  = express.Router();
var camp    = require('../models/campgrounds.js');
//var NodeGeocoder = require('node-geocoder');
 
//var options = {
//  provider: 'google',
//  httpAdapter: 'https',
//  apiKey: process.env.GEOCODER_API_KEY,
//  formatter: null
//};
 
//var geocoder = NodeGeocoder(options);

router.post("/campgrounds",isLoggedIn,function(req,res){
	var newCamp=req.body.name;
	var image=req.body.image;
	var info=req.body.info;
	var price=req.body.price;
    var author={ 
        id:req.user._id,
        username: req.user.username
       } 
	//geocoder.geocode(req.body.location,function(err,location){
		//if (err || location.length>0) {
		//	re.flash("error","Not Valid Address");
		//	res.redirect("back");
		//}
		// var lat = location[0].latitude;
        // var lng = location[0].longitude;
        // var location = location[0].formattedAddress;
        // var addCamp={name: newCamp ,url: image, description: info,author:author,lat:lat,lng:lng,location:location};
	camp.create(addCamp,function(err,newly){
		if (err) {
			res.flash("error",err.message);
			res.redirect("back");
		}
		else{
			req.flash("success","Successfully Added!! " + newCamp);
			res.redirect("/campgrounds");
		}
	 });
	//});
});

router.get('/campgrounds/new', isLoggedIn ,function(req,res){
	res.render("camps/add.ejs");
});

router.get('/campgrounds',function(req,res){
		camp.find({},function(err,allCamps){
		if (err) {
			console.log(err);
		}
		else{
			res.render("camps/Campgrounds",{camps : allCamps, currentUser : req.user});
		}
	});
});
//========Show Route===============
router.get("/campgrounds/:id",function(req,res){
	camp.findById(req.params.id).populate("Comment").exec(function(err,found){
		if (err) {
			console.log(err);
		}
		else{
			res.render("camps/show.ejs",{found : found});
		}
	});
	
});
//=======Edit Route================
router.get('/campgrounds/:id/edit',checkUser,function(req,res){
	camp.findById(req.params.id,function(err,Campground){
		if (err) {
			req.flash("error",err.message);
		}

		   res.render("camps/edit",{found : Campground});
	});
});

//=======Update Route==============
router.put('/campgrounds/:id',checkUser,function(req,res){
	//geocoder.geocode(req.body.location,function(err,location){
		//if (err || location.length>0) {
			//req.flash("error","Invalid location");
			//res.redirect('/campgrounds/:id/edit');
		//}
	//req.body.camps.lat = location[0].latitude;
	//req.body.camps.lng = location[0].longitude;
	//req.body.camps.location = location[0].formattedAddress;
	camp.findByIdAndUpdate(req.params.id, req.body.camps , function(err,update){
		if (err) {
			console.log(err);
			res.redirect('/campgrounds/:id/edit');
		}
		else{
			req.flash("success","Edit Done");
			res.redirect('/campgrounds/' + req.params.id );
		}
	});
 //});
});

//===========Destroy Camps================
router.delete('/campgrounds/:id',checkUser,function(req,res){
	camp.findByIdAndRemove(req.params.id,function(err,del){
		req.flash("success","Deleted Campground");
		res.redirect('/campgrounds');
	});
});
//middleware
function isLoggedIn(req, res , next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login First");
	res.redirect('/login');
};

function checkUser(req,res,next){
	if(req.isAuthenticated()){
		camp.findById(req.params.id,function(err,Campground){
			if (err) {
				console.log(err);
				res.redirect('/campgrounds');
			}
			else{
				if (Campground.author.id.equals(req.user._id)) {
					next();
				}
				else{
					req.flash("error","You Dont Have Permission to do this");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error","You need to be Logged in to do that");
		res.redirect('back');
	}
};

module.exports = router;