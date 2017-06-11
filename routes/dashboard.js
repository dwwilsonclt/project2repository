var express = require("express");
var router = express.Router();

router.get("/", isLoggedIn, function(req, res, next) {
    if (req.session.userType === "Admin") {
        res.end("this is the Admin homepage");
        // here we will render the Admin homepage
        // each button/link inside this homepage will have admin in front
        // now we know that all routes that begin with admin (localhost:8080/dashboard/admin/...)
        // are for an Admin view
    } else if (req.session.userType === "Professor") {
        res.end("This is the professor homepage");
        // here we will render the Professor homepage
        // each button/link inside this homepage will have professor in front
        // now we know that all routes that begin with professor (localhost:8080/dashboard/professor/...)
        // are for a Professor view
    } else if (req.session.userType === "Student") {
        res.end("This is the Student homepage");
        // here we will render the Student homepage
        // each button/link inside this homepage will have student in front
        // now we know that all routes that begin with student (localhost:8080/dashboard/student/...)
        // are for a Student view
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;
