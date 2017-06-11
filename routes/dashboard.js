var express = require("express");
var router = express.Router();

router.get("/", isLoggedIn, function(req, res, next) {
    if (req.session.userType === "Admin") {
        res.end("this is the Admin homepage");
    } else if (req.session.userType === "Professor") {
        res.end("This is the professor homepage");
    } else if (req.session.userType === "Student") {
        res.end("This is the Student homepage");
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;