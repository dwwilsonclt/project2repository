var express = require("express");
var router = express.Router();
var moment = require("moment");
var db = require("../../models");

router.get("/:professor/classes/:class", isLoggedIn, function (req, res, next) {
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
                include: {
                    model: db.Person
                }
            }
        ]
    })
    .then(function(data) {
        if (data) {
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
            // res.json(classInfo);
            res.render("professor/summary", hbsObject);
        } else {
            res.render("professor/noAccess");
        }
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.get("/:professor/classes/:class/Students", isLoggedIn, function (req, res, next) {
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
                include: [
                    {
                        model: db.Person
                    },
                    {
                        model: db.Class
                    }
                ]
            }
        ]
    })
    .then(function(classInfo) {
        var students = classInfo.dataValues.students;
        var hbsObject = {};
        hbsObject.professor = true;
        hbsObject.className = classInfo.dataValues.course.department_id + " " + classInfo.dataValues.course.course_number + "-" + classInfo.dataValues.section;
        hbsObject.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        hbsObject.students = [];
        students.forEach(function(student) {
            var obj = {
                name: student.person.first_name + " " + student.person.last_name,
                class_level: student.class_level,
                classes: student.classes.length,
                id: student.id
            };
            hbsObject.students.push(obj);
        });
        // res.json(hbsObject);
        res.render("professor/students", hbsObject)
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:professor/classes/:class/Students/:student", isLoggedIn, function (req, res, next) {
    db.Student.findOne({
        where: {
            id: req.params.student
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
        if (!data) {
            res.send(404);
        } else {
            data.dataValues.professor = true;
            for (var i = 0; i < data.dataValues.classes.length; i++) {
                data.dataValues.classes[i].schedule.begin_time = moment(data.dataValues.classes[i].schedule.begin_time, "hh:mm:ss").format("h:mm A");
                data.dataValues.classes[i].schedule.end_time = moment(data.dataValues.classes[i].schedule.end_time, "hh:mm:ss").format("h:mm A");
            }
            data.dataValues.professorId = req.params.professor;
            res.render("professor/student", data.dataValues)
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:professor/classes/:class/Assignments/1", isLoggedIn, function (req, res, next) {
    db.Coursework.findAll({
        where: {
            class_id: req.params.class
        },
        include: [
            {
                model: db.Class,
                include: [
                    {
                        model: db.Professor
                    }
                ]
            }
        ]
    })
    .then(function(data) {
        var hbsObject = {};
        hbsObject.professor = true;
        hbsObject.asignmentTopicsPage = true;
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
        res.render("professor/summary", hbsObject);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:professor/classes/:class/Assignments/1/add-assignment-topic", isLoggedIn, function (req, res, next) {
    var urlTemp = (req.protocol + '://' + req.get('host') + req.originalUrl).split("/");
    var newUrl = "";
    for (var i = 0; i < urlTemp.length - 1; i++) {
        newUrl += urlTemp[i] + "/";
    }
    newUrl = newUrl.substring(0, newUrl.length-1);
    res.render("forms/assignmentTopic", {
        classId: req.params.class,
        sourceUrl: newUrl
    });
});

router.get("/:professor/classes/:class/Assignments/1/:topic_name/:topic_id", isLoggedIn, function (req, res, next) {
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
        hbsObject.professor = true;
        hbsObject.assignmentsPage = true;
        hbsObject.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        hbsObject.panels = [];
        data.forEach(function(assignment) {
            var obj = {
                title: assignment.dataValues.name,
                descriptions: [
                    moment.tz(moment(assignment.dataValues.due_date).add(5,"hours"), "America/New_York").format("MMM DD, YYYY")
                ],
                id: assignment.dataValues.id
            };
            hbsObject.panels.push(obj);
        });
        // res.json(data);
        res.render("professor/summary", hbsObject);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:professor/classes/:class/Assignments/1/:topic_name/:topic_id/add-assignment", isLoggedIn, function (req, res, next) {
    var urlTemp = (req.protocol + '://' + req.get('host') + req.originalUrl).split("/");
    var newUrl = "";
    for (var i = 0; i < urlTemp.length - 1; i++) {
        newUrl += urlTemp[i] + "/";
    }
    newUrl = newUrl.substring(0, newUrl.length-1);
    res.render("forms/assignment", {
        classId: req.params.class,
        courseworkId: req.params.topic_id,
        sourceUrl: newUrl
    });
});

router.get("/:professor/classes/:class/Assignments/1/:topic_name/:topic_id/:asgnmt_name/:asgnmnt_id", isLoggedIn, function (req, res, next) {
    db.Assignment.findOne({
        where: {
            id: req.params.asgnmnt_id
        },
        include: [
            {
                model: db.Student,
                include: [
                    {
                        model: db.Person
                    }
                ]
            }
        ]
    })
    .then(function(data) {
        // var hbsObject = {};
        // hbsObject.professor = true;
        // hbsObject.assignmentsPage = true;
        // hbsObject.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        // hbsObject.panels = [];
        // data.forEach(function(assignment) {
        //     var obj = {
        //         title: assignment.dataValues.name,
        //         descriptions: [
        //             assignment.dataValues.due_date
        //         ],
        //         id: assignment.dataValues.id
        //     };
        //     hbsObject.panels.push(obj);
        // });
        data.dataValues.professor = true;
        data.dataValues.sourceurl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // res.json(data);
        res.render("forms/grade", data);
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