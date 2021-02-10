var express = require('express');
var router  = express.Router();
var camp = require('../models/campgrounds.js');
var Comment = require('../models/comments.js');
//==========================Comment Section==================================
router.get('/campgrounds/:id/comments/new', isLoggedIn ,function(req,res){
	
	camp.findById(req.params.id,function(err,found){
		if (err) {
			console.log(err);
		}
		else{
			res.render("comments/addcomment",{campground : found});
		}
	});
});
router.post('/campgrounds/:id/comments',isLoggedIn,function(req,res){
	camp.findById(req.params.id,function(err,campground){
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		}
		else{
		 Comment.create(req.body.campground,function(err,comment){
		 	if (err) {
		 		console.log(err);
		 	}
		 	else{
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
		 		campground.Comment.push(comment);
		 		campground.save();
				 req.flash("success","Comment Added Successfully");
		 		res.redirect("/campgrounds/" + req.params.id);
		 	}
		 });
		}
	});
});
//======Edit Comment===========
router.get('/campgrounds/:id/comments/:comment_id/edit',ownership,function(req,res){
		Comment.findById(req.params.comment_id,function(err,comment){
			res.render("comments/editComment",{comment:comment,campground_id:req.params.id})
		});
});
router.put('/campgrounds/:id/comments/:comment_id',ownership,function(req,res){
			Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,editcomment){
				if (err) {
					console.log(err);
					res.redirect("back");
				}
				else{
				req.flash("success","Edited Comment");
				res.redirect('/campgrounds/'+req.params.id);
				}
			});
});
//======Delete Comment=========
router.delete('/campgrounds/:id/comments/:comment_id/delete',ownership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,del){
		if (err) {
			console.log(err);
			res.redirect('/campgrounds/'+req.params.id);
		}
		req.flash("success","Deleted Comment");		
		res.redirect('/campgrounds/'+req.params.id);
	});
});
//=============================
function isLoggedIn(req, res , next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login First");
	res.redirect('/login');
};

function ownership(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,comment){
			if (err) {
				console.log(err);
			}
			else{
				if(comment.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","You Dont Have Permission to do this");
					res.redirect("back")
					}		
				}
		});
	}
	else{
		req.flash("error","You need to be Logged in to do that");
		res.redirect('/login');
	}
};

module.exports = router;