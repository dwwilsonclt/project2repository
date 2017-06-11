var express = require("express");
var router = express.Router();

router.get("/", isAdmin, isLoggedIn, function(req, res, next) {
    res.end("this is the Admin homepage");
});

router.get("/", isProfessor, isLoggedIn, function(req, res, next) {
    res.end("This is the professor homepage");
});

router.get("/", isStudent, isLoggedIn, function(req, res, next) {
    res.end("This is the student homepage");
});

function isAdmin(req, res, next) {
    if (req.session.userType === "Admin") {
        return next();
    }
    res.redirect("/");
}

function isProfessor(req, res, next) {
    if (req.session.userType === "Professor") {
        return next();
    }
    res.redirect("/");
}

function isStudent(req, res, next) {
    if (req.session.userType === "Student") {
        return next();
    }
    res.redirect("/");
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;