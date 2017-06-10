var express = require("express");
var router = express.Router();
var db = require("../../models");

router.get("/", isLoggedIn, function (req, res, next) {
    db.Professor.findAll({
        include: [
            {
                model: db.Person
            },
            {
                model: db.Department
            },
            {
                model: db.Room
            }
        ]
    })
    .then(function(professors) {
        res.json(professors);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.get("/:professor", isLoggedIn, function (req, res, next) {
    db.Professor.findOne({
        where: {
            id: req.params.professor
        },
        include: [
            {
                model: db.Person
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
        res.json(professor);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.get("/:professor/:class", isLoggedIn, function (req, res, next) {
    db.Class.findOne({
        where: {
            id: req.params.class,
            professor_id: req.params.professor
        },
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
                model: db.Professor,
                include: [
                    {
                        model: db.Person
                    },
                    {
                        model: db.Room,
                        include: [
                            {
                                model: db.Building
                            }
                        ]
                    }
                ]
            },
            {
                model: db.Room,
                include: [
                    {
                        model: db.Building
                    }
                ]
            },
            {
                model: db.Student,
                include: {
                    model: db.Person
                }
            }
        ]
    })
    .then(function(classInfo) {
        res.json(classInfo);
    })
    .catch(function(error) {
        console.log(error);
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;