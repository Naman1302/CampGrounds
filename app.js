 require('dotenv').config();
var express               = require('express'),
	flash                 = require('connect-flash'),
	dayjs                 = require('dayjs'),
	relativeTime          = require('dayjs/plugin/relativeTime')
    app                   = express(),
    bodyParser            = require('body-parser'),
    mongoose              = require('mongoose'),
	methodOverride        = require('method-override'),
	passport              = require('passport'),
	LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
	User                  = require('./models/user.js')
	camp                  = require('./models/campgrounds.js'),
	Comment               = require('./models/comments.js'),
	seedDB                = require('./seeds');

var campRoutes    = require('./routes/camps.js'),
	authRoutes    = require('./routes/auth.js'),
	commentRoutes = require('./routes/comment.js');

mongoose.connect("mongodb://localhost/camp_db");
app.locals.dayjs=require('dayjs');
dayjs.extend(relativeTime);	    
//seedDB();
//======Passport Config=======

app.use(require('express-session')({
	secret:'secret',
	resave: false,
	saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//======App Config============

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});
app.use(methodOverride("_method"));

//============================
app.use(authRoutes);
app.use(campRoutes);
app.use(commentRoutes);

//===========================================================================
app.listen(3000,function(){
	console.log("Server Running!!")
});