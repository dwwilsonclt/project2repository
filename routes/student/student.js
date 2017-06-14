var express = require("express");
var router = express.Router();
var moment = require("moment");
var db = require("../../models");

router.post("/enroll", function (req, res, next) {
    // req.session.enrollDpmt = "";
    req.session.enrollDpmt = req.body.department_id;
    console.log(req.session);
    var hbsObject = {};
    db.AcademicPeriod.findAll()
    .then(function(data) {
      hbsObject.academicPeriods = [];
      data.forEach(function(acdmPeriod) {
          var obj = {
              id: acdmPeriod.id,
              name: acdmPeriod.name
          };
          hbsObject.academicPeriods.push(obj);
      });
      return db.Department.findAll();
    })
    .then(function(data) {
      hbsObject.departments = [];
      data.forEach(function(department) {
          var obj = {
              id: department.id,
              name: department.name
          };
          hbsObject.departments.push(obj);
      });
      console.log(req.session);
      return db.Course.findAll({
          where: {
              department_id: req.session.enrollDpmt
          }
      });
    })
    .then(function(data) {
      hbsObject.courses = [];
      data.forEach(function(course) {
          var obj = {
              id: course.id,
              name: course.department_id + " " + course.course_number
          };
          hbsObject.courses.push(obj);
      });
      // res.json(data);
      // res.json(hbsObject);
      res.redirect("/dashboard/student/enroll", hbsObject);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/enroll", isLoggedIn, function (req, res, next) {
    var hbsObject = {};
    db.AcademicPeriod.findAll()
    .then(function(data) {
        hbsObject.academicPeriods = [];
        data.forEach(function(acdmPeriod) {
            var obj = {
                id: acdmPeriod.id,
                name: acdmPeriod.name
            };
            hbsObject.academicPeriods.push(obj);
        });
        return db.Department.findAll();
    })
    .then(function(data) {
        hbsObject.departments = [];
        data.forEach(function(department) {
            var obj = {
                id: department.id,
                name: department.name
            };
            hbsObject.departments.push(obj);
        });
        console.log(req.session);
        return db.Course.findAll({
            where: {
                department_id: hbsObject.departments[0].id
            }
        });
    })
    .then(function(data) {
        hbsObject.courses = [];
        data.forEach(function(course) {
        var obj = {
            id: course.id,
            name: course.department_id + " " + course.course_number
        };
        hbsObject.courses.push(obj);
        });
        // res.json(data);
        // res.json(hbsObject);
        res.render("forms/classEnroll", hbsObject);
    })
    .catch(function (error) {
        console.log(error);
    });
});

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
            hbsObject.coursework = {};
            hbsObject.coursework.names = ["Num. of topics"];
            hbsObject.coursework.values = [0];
            data.dataValues.assignments.forEach(function(assignment) {
                var obj = {
                    name: assignment.name,
                    grade: assignment.assignment_student.grade
                };
                hbsObject.assignments.push(obj);
                if (hbsObject.coursework.names.indexOf(assignment.coursework.name.replace(" ", "_")) === -1) {
                    hbsObject.coursework.names.push(assignment.coursework.name.replace(" ", "_"));
                    hbsObject.coursework.names.push(assignment.coursework.name.replace(" ", "_") + "_n");
                    hbsObject.coursework.names.push(assignment.coursework.name.replace(" ", "_") + "_weight");
                    hbsObject.coursework.values.push(assignment.assignment_student.grade);
                    hbsObject.coursework.values.push(1);
                    hbsObject.coursework.values.push(assignment.coursework.weight);
                    hbsObject.coursework.values[0]++;
                } else {
                    var index = hbsObject.coursework.names.indexOf(assignment.coursework.name.replace(" ", "_"));
                    hbsObject.coursework.values[index] += assignment.assignment_student.grade;
                    hbsObject.coursework.values[index+1]++;
                }
            });
            hbsObject.averages = [];
            hbsObject.finalGrade = 0;
            for (var i = 0; i < hbsObject.coursework.values[0]; i++) {
                var obj = {
                    name: hbsObject.coursework.names[1+3*i].replace("_", " "),
                    grade: parseFloat(hbsObject.coursework.values[1+3*i] / hbsObject.coursework.values[2+3*i]).toFixed(2)
                };
                hbsObject.averages.push(obj);
                hbsObject[hbsObject.coursework.names[1+3*i]] = parseFloat(hbsObject.coursework.values[1+3*i] / hbsObject.coursework.values[2+3*i]).toFixed(2);
                hbsObject.finalGrade += hbsObject[hbsObject.coursework.names[1+3*i]] * hbsObject.coursework.values[3+3*i];
                if (i === hbsObject.coursework.values[0] - 1) {
                    hbsObject.letterGrade = hbsObject.finalGrade >= 90 ? "A" : hbsObject.finalGrade >= 80 ? "B" : hbsObject.finalGrade >= 70 ? "C" : hbsObject.finalGrade >= 60 ? "D" : "F";
                    hbsObject.finalGrade = hbsObject.finalGrade.toFixed(2);
                    delete hbsObject.coursework;
                    break;
                }
            }
            for (var i = 0; i < hbsObject.averages.length; i++) {
                delete hbsObject[hbsObject.averages[i].name];
            }
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