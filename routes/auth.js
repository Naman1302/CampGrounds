var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User     = require('../models/user.js');


//=======Routes==========
router.get('/',function(req,res){
	res.redirect('/campgrounds');
});


//===============Authentication==========================
//=======================================================

//================Register=================
router.get('/register',function(req,res){
	res.render("camps/register.ejs");
});
router.post('/register',function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if (err){
			req.flash("error",err.message);
			res.redirect('/register');
		}
		else{
			passport.authenticate('local')(req,res,function(){
				req.flash("success","Welcome " + user.username);
				res.redirect('/campgrounds');
			});
		}
	})
})

//================Login====================
router.get('/login',function(req,res){
	res.render("camps/login");
});
router.post('/login',passport.authenticate('local',
   {
	successRedirect:"/campgrounds",
	faliureRedirect:"/login"
	}),function(req,res){
});
router.get('/logout',function(req,res){
	req.logout();
	req.flash("success","Logged Out sucessfully")
	res.redirect('/campgrounds');
})
function isLoggedIn(req, res , next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login First");
	res.redirect('/login');
};

module.exports = router;