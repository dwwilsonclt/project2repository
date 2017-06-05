var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db.User.findById(id)
	.then(function(user){
		done(null, user);
	}).catch(function(error){
		done(error, null);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: "username",
	passwordField: "password",
	passReqToCallback: true
}, function(req, username, password, done) {
	req.checkBody("email", "Invalid email")
	.notEmpty()
	.isEmail();
	req.checkBody("password", "Invalid password")
	.notEmpty()
	.isLength({
		min: 6
	});
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash("error", messages));
	}
	db.User.findOne({
		where: {
			username: username
		}
	})
	.then(function (user){
		if (user) {
			return done(null, false, {
				message: "This username is taken"
			});
		}
		return db.User.findOne({
			where: {
				email: req.body.email
			}
		});
	})
	.then(function (user){
		if (user) {
			return done(null, false, {
				message: "A user with this email already exists"
			});
		}

		if (password !== req.body.rpassword) {
			return done(null, false, {
				message: "Passwords don't match"
			});
		}

		var newUser = db.User.build({
			username: username,
			password: password,
			first_name: req.body.firstname,
			last_name: req.body.lastname,
			email: req.body.email,
			city: req.body.city,
			state: req.body.state
		});
		db.User.encryptPassword(password, function(hash) {
            newUser.password = hash;
            newUser.save().then(function(user) {
                return done(null, user);
            });
        });
	})
	.catch(function(error) {
	  console.log(error);
	});
}));

passport.use("local.signin", new LocalStrategy({
	usernameField: "username",
	passwordField: "password",
	passReqToCallback: true
}, function(req, username, password, done) {
	req.checkBody("username", "Invalid username")
	.notEmpty();
	req.checkBody("password", "Invalid password")
	.notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash("error", messages));
	}
	db.User.findOne({
		where: {
			username: username
		}
	})
	.then(function(user){
		if (!user) {
			return done(null, false, {
				message: "User not found"
			});
		}
		var passwd = user.password;
		db.User.validPassword(password, passwd, function(isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Wrong password"
                });
            }
        });
	})
	.catch(function(error) {
		console.log(error);
    });
}));
