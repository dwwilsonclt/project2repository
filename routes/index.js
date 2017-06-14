var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");
var db = require("../models");

var csrfProtection = csrf();
router.use(csrfProtection);

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

router.get("/", function(req, res, next) {
    var messages = req.flash("error");
    res.render("user/signin", {
        title: "Project Title | Sign In",
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/dashboard",
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
