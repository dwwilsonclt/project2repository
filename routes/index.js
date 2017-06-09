var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/", function(req, res, next) {
    res.render("index", {
        title: "Project 2"
    });
});

// router.get("/profile", isLoggedIn, function(req, res, next) {
//     res.render("user/profile");
// });

router.get("/logout", isLoggedIn, function(req, res, next) {
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
    // successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true
}), function(req, res, next) {
    res.render("user/profile", {
        userType: req.body.userType
    });
});

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
