var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.serializeUser(function(user, done) {
	done(null, user.email);
});

passport.deserializeUser(function(email, done) {
	db.Admin.findOne({
		where: {
			email: email
		}
	})
	.then(function(admin){
		if (!admin) {
            db.Professor.findOne({
                where: {
                    email: email
                }
            })
			.then(function(professor){
				if (!professor) {
					db.Student.findOne({
						where: {
							email: email
						}
					})
					.then(function(student){
  						done(null, student);
					})
					.catch(function(error){
  						done(error, null);
					});
				} else {
                    done(null, professor);
				}
			})
			.catch(function(error){
				done(error, null);
			});
		} else {
            done(null, admin);
		}
	})
	.catch(function(error){
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
	usernameField: "email",
	passwordField: "userPassword",
	passReqToCallback: true
}, function(req, email, password, done) {
    req.session.userType = req.body.userType;
	req.checkBody("email", "Invalid email")
	.notEmpty()
	.isEmail();
	req.checkBody("userPassword", "Invalid password")
	.notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function(error) {
			messages.push(error.msg);
		});
		return done(null, false, req.flash("error", messages));
	}
	db[req.body.userType].findOne({
		where: {
            email: email
		}
	})
	.then(function(user){
		if (!user) {
			return done(null, false, {
				message: req.body.userType + " not found"
			});
		}
		db.Person.validPassword(password, user.password, function(isMatch) {
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
