var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

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

router.get("/", function(req, res, next) {
    var messages = req.flash("error");
    res.render("index", {
        title: "Project Title | Sign In",
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

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
    res.redirect("/dashboard");
}

module.exports = router;
