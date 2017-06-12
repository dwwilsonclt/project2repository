var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", isLoggedIn, function(req, res, next) {
    if (req.session.userType === "Admin") {

        //need to tell header what the user is to render nav bar correctly
        var admin = {
            admin : true
        };
        res.render("partials/admin/dashboard", admin);
        // here we will render the Admin homepage
        // each button/link inside this homepage will have admin in front
        // now we know that all routes that begin with admin (localhost:8080/dashboard/admin/...)
        // are for an Admin view
    } else if (req.session.userType === "Professor") {
        professorHome(req, function(data) {
            if (!data) {
                res.send(404);
            } else {
                data.dataValues.professor = true;
                // data.dataValues.isProfessor = true;
                data.dataValues.url = req.protocol + '://' + req.get('host') + req.originalUrl;
                // res.json(data);
                res.render("professor/professor", data.dataValues)
            }
        });
    } else if (req.session.userType === "Student") {
        studentHome(req, function(data) {
            if (!data) {
                res.send(404);
            } else {
                data.dataValues.student = true;
                // data.dataValues.isStudent = true;
                data.dataValues.url = req.protocol + '://' + req.get('host') + req.originalUrl;
                // res.json(data);
                res.render("student/student", data.dataValues)
            }
        });
    }
});

function professorHome(req, cb) {
    db.Professor.findOne({
        where: {
            email: req.session.passport.user
        },
        include: [
            {
                model: db.Person
            },
            {
                model: db.Department
            },
            {
                model: db.Room
            },
            {
                model: db.Class,
                include: [
                    {
                        model: db.Course
                    },
                    {
                        model: db.AcademicPeriod
                    },
                    {
                        model: db.Schedule
                    },
                    {
                        model: db.Room
                    }
                ]
            }
        ]
    })
    .then(function(professor) {
        cb(professor);
    })
    .catch(function(error) {
        console.log(error);
    })
}

function studentHome(req, cb) {
    db.Student.findOne({
        where: {
            email: req.session.passport.user
        },
        include: [
            {
                model: db.Person
            },
            {
                model: db.Department
            },
            {
                model: db.Class,
                include: [
                    {
                        model: db.Professor,
                        include: [
                            {
                                model: db.Person
                            }
                        ]
                    },
                    {
                        model: db.Course
                    },
                    {
                        model: db.AcademicPeriod
                    },
                    {
                        model: db.Schedule
                    },
                    {
                        model: db.Room
                    }
                ]
            }
        ]
    })
    .then(function(data) {
        cb(data);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;
