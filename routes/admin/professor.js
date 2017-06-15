var express = require("express");
var router = express.Router();
var moment = require("moment");
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
            },
            {
                model: db.Class
            }
        ]
    })
    .then(function(data) {
        var hbsObject = {};
        hbsObject.admin = true;
        hbsObject.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        hbsObject.professors = [];
        data.forEach(function(professor) {
            var obj = {
                first_name: professor.person.first_name,
                last_name: professor.person.last_name,
                email: professor.email,
                department: professor.department.id,
                classes: professor.classes.length,
                id: professor.id
            };
            hbsObject.professors.push(obj);
        });
        // res.json(hbsObject);
        res.render("admin/professors", hbsObject);
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
    .then(function(data) {
        if (!data) {
            res.send(404);
        } else {
            data.dataValues.professor = true;
            for (var i = 0; i < data.dataValues.classes.length; i++) {
                data.dataValues.classes[i].schedule.begin_time = moment(data.dataValues.classes[i].schedule.begin_time, "hh:mm:ss").format("h:mm A");
                data.dataValues.classes[i].schedule.end_time = moment(data.dataValues.classes[i].schedule.end_time, "hh:mm:ss").format("h:mm A");
            }
            data.dataValues.url = req.protocol + '://' + req.get('host') + req.originalUrl;
            // res.json(data.dataValues);
            res.render("admin/professor", data.dataValues)
        }
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.get("/:professor/:class", isLoggedIn, function (req, res, next) {
    db.Class.findOne({
        where: {
            id: req.params.class
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
                        model: db.Room
                    }
                ]
            },
            {
                model: db.Room
            },
            {
                model: db.Student,
                include: {
                    model: db.Person
                }
            }
        ]
    })
    .then(function(data) {
        var classInfo = data.dataValues;
        var hbsObject = {};
        hbsObject.professor = true;
        hbsObject.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        hbsObject.panels = [];
        hbsObject.panels[0] = {
            title: "Professor",
            descriptions: [
                classInfo.professor.person.first_name + " " + classInfo.professor.person.last_name,
                classInfo.professor.room.building_id + " " + classInfo.professor.room.room_number
            ],
            id: classInfo.professor.id
        };
        hbsObject.panels[1] = {
            title: "Location",
            descriptions: [
                classInfo.room.building_id + " " + classInfo.room.room_number
            ],
            id: classInfo.room.id
        };
        hbsObject.panels[2] = {
            title: "Schedule",
            descriptions: [
                classInfo.academic_period.name,
                classInfo.schedule.days + ", " + moment(classInfo.schedule.begin_time, "hh:mm:ss").format("h:mm A") + " - " + moment(classInfo.schedule.end_time, "hh:mm:ss").format("h:mm A")
            ],
            id: classInfo.schedule.id
        };
        hbsObject.panels[3] = {
            title: "Assignments",
            descriptions: [
            ],
            id: 1
        };
        hbsObject.panels[4] = {
            title: "Grades",
            descriptions: [
            ]
        };
        hbsObject.panels[5] = {
            title: "Students",
            descriptions: [
                classInfo.students.length + " students"
            ]
        };
        // res.json(hbsObject);
        res.render("admin/classInfo", hbsObject);
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