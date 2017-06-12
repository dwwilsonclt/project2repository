var express = require("express");
var router = express.Router();
var moment = require("moment");
var db = require("../../models");

router.get("/:student/classes/:class", isLoggedIn, function (req, res, next) {
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
                        model: db.Room,
                        // include: [
                        //     {
                        //         model: db.Building
                        //     }
                        // ]
                    }
                ]
            },
            {
                model: db.Room,
                // include: [
                //     {
                //         model: db.Building
                //     }
                // ]
            },
            {
                model: db.Student,
                // where: {
                //     id: req.params.student
                // },
                include: {
                    model: db.Person
                }
            }
        ]
    })
    .then(function(data) {
        var classInfo = data.dataValues;
        var studentFound = false;
        for (var i = 0; i < classInfo.students.length; i++) {
            if (parseInt(req.params.student) === classInfo.students[i].id) {
                studentFound = true;
                break;
            }
        }
        // res.json(data);
        if (studentFound) {
            var hbsObject = {};
            hbsObject.student = true;
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
                descriptions: [],
                id: 1
            };
            hbsObject.panels[4] = {
                title: "Grades",
                descriptions: []
            };
            hbsObject.panels[5] = {
                title: "Students",
                descriptions: [
                    classInfo.students.length + " students"
                ]
            };
            // res.json(data);
            res.render("student/summary", hbsObject);
        } else {
            res.render("student/noAccess");
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:student/classes/:class/Professor/:professor", isLoggedIn, function (req, res, next) {
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
            data.dataValues.student = true;
            for (var i = 0; i < data.dataValues.classes.length; i++) {
                data.dataValues.classes[i].schedule.begin_time = moment(data.dataValues.classes[i].schedule.begin_time, "hh:mm:ss").format("h:mm A");
                data.dataValues.classes[i].schedule.end_time = moment(data.dataValues.classes[i].schedule.end_time, "hh:mm:ss").format("h:mm A");
            }
            data.dataValues.studentId = req.params.student;
            // res.json(data);
            res.render("student/professor", data.dataValues)
        }
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.get("/:student/classes/:class/Students", isLoggedIn, function (req, res, next) {
    db.Class.findOne({
        where: {
            id: req.params.class
        },
        include: [
            {
                model: db.Course
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
        classInfo.dataValues.student = true;
        // res.json(classInfo.dataValues);
        res.render("student/students", classInfo.dataValues)
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:student/classes/:class/Assignments/1", isLoggedIn, function (req, res, next) {
    db.Coursework.findAll({
        where: {
            class_id: req.params.class
        },
        include: [
            {
                model: db.Class
            }
        ]
    })
    .then(function(data) {
        var hbsObject = {};
        hbsObject.student = true;
        hbsObject.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        hbsObject.panels = [];
        data.forEach(function(coursework) {
         var obj = {
             title: coursework.dataValues.name,
             descriptions: [
                 coursework.dataValues.weight * 100 + "%"
             ],
             id: coursework.dataValues.id
         };
         hbsObject.panels.push(obj);
        });
        // res.json(data);
        res.render("student/summary", hbsObject);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:student/classes/:class/Assignments/1/:topic_name/:topic_id", isLoggedIn, function (req, res, next) {
    db.Assignment.findAll({
        where: {
            coursework_id: req.params.topic_id
        },
        include: [
            {
                model: db.Coursework,
                include: [
                    {
                        model: db.Class
                    }
                ]
            },
            {
                model: db.Student
            }
        ]
    })
    .then(function(data) {
        var hbsObject = {};
        hbsObject.student = true;
        hbsObject.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        hbsObject.panels = [];
        data.forEach(function(assignment) {
            var obj = {
                title: assignment.dataValues.name,
                descriptions: [
                  assignment.dataValues.due_date
                ],
                id: assignment.dataValues.id
            };
            hbsObject.panels.push(obj);
        });
        // res.json(data);
        res.render("student/summary", hbsObject);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:student/classes/:class/Grades", isLoggedIn, function (req, res, next) {
    db.Student.findOne({
        where: {
            id: req.params.student
        },
        include: [
            {
                model: db.Person
            },
            {
                model: db.Assignment,
                include: [
                    {
                        model: db.Coursework,
                        where: {
                            class_id: req.params.class
                        },
                        include: [
                            {
                                model: db.Class,
                                include: [
                                    {
                                        model: db.Course
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(function(data) {
        if (data) {
            var hbsObject = {};
            hbsObject.student = true;
            hbsObject.className = data.dataValues.assignments[0].coursework.class.course.department_id + " " + data.dataValues.assignments[0].coursework.class.course.course_number + "-" + data.dataValues.assignments[0].coursework.class.section;
            hbsObject.assignments = [];
            data.dataValues.assignments.forEach(function(assignment) {
                var obj = {
                    name: assignment.name,
                    grade: assignment.assignment_student.grade
                };
                hbsObject.assignments.push(obj);
            });
            // res.json(hbsObject);
            res.render("student/grades", hbsObject)
        } else {
            res.end("You don't have any assignments for this class yet.")
        }
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