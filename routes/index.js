var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");
var db = require("../models");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/", function(req, res, next) {
    res.render("index", {
        title: "Project 2"
    });
});

// return user information
router.get("/profile/info", function(req, res, next) { 
    var userType = req.session.userType;
    db[userType].findOne({
            where: {
                email: req.session.passport.user
            },
            include: [{
                model: db.Person
            }]
        })
        .then(function(user) {
            res.json(user.dataValues);
            // console.log(user.dataValues);
        })
        .catch(function(error) {
            console.log(error);
        });
});

// return all person records
router.get("/depts", function(req, res, next) { 
    var navPath = req.session.userType.toLowerCase()+"/nav";
    console.log(navPath);
    db.Department.findAll({
        })
        .then(function(depts) {
            var hbsObject = {
                departments: depts,
                navPath: navPath
            };
            res.render("partials/admin/departments", hbsObject);
        })
        .catch(function(error) {userType
            console.log(error);
        });
});

router.get("/profile", isLoggedIn, function(req, res, next) {
    var userType = req.session.userType;
    db[userType].findOne({
            where: {
                email: req.session.passport.user
            }
        })
        .then(function(user) {
            if (user) {
                var admin = userType === "Admin" ? true : false;
                var professor = userType === "Professor" ? true : false;
                var student = userType === "Student" ? true : false;
                res.render("user/profile", {
                    admin: admin,
                    professor: professor,
                    student: student,
                    userType: userType
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});

router.get("/logout", isLoggedIn, function(req, res, next) {
    req.session.userType = null;
    req.logout();
    res.redirect("/");
});

router.use("/", notLoggedIn, function(req, res, next) {
    next();
});

router.get("/signup", function(req, res, next) {
    var messages = req.flash("error");
    res.render("user/signup", {
        title: "Project Title | Sign Up",
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post("/signup", passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/signin", function(req, res, next) {
    var messages = req.flash("error");
    res.render("user/signin", {
        title: "Project Title | Sign In",
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true
}));

router.get("/forgot-password", function(req, res, next) {
    var messages = req.flash("error");
    res.render("user/forgotpass", {
        title: "Project Title | Forgot Password",
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;
