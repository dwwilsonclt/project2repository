var express = require("express");
var router = express.Router();
var db = require("../../models");

// all departments
// localhost:8080/dashboard/admin/departments
router.get("/", isLoggedIn, function(req, res, next) {
    db.Department.findAll()
        .then(function(data) {
            //build a hbsObject with necessary info to pass to render the page
            var hbsObject = {};
            hbsObject.admin = true;
            hbsObject.panels = [];

            data.forEach(function(department) {
                var obj = {
                    title: department.dataValues.id,
                    descriptions: [
                        department.dataValues.name
                    ]
                };
                hbsObject.panels.push(obj);
            });
            res.render("partials/admin/allDepartment", hbsObject);
        })
        .catch(function(error) {
            console.log(error);
        });
});


// localhost:8080/dashboard/admin/departments/depa/add
router.get("/departments/add-department", isLoggedIn, function (req, res, next) {
    var urlTemp = (req.protocol + '://' + req.get('host') + req.originalUrl).split("/");
    var newUrl = "";
    for (var i = 0; i < urlTemp.length - 2; i++) {
        newUrl += urlTemp[i] + "/";
    }
    newUrl = newUrl.substring(0, newUrl.length-1);
    res.render("partials/admin/newDepartment", {
        classId: req.params.class,
        sourceUrl: newUrl
    });
});

router.post("/departments/add-professor/setBldg", function (req, res, next) {
    db.Room.findAll({
        where: {
            building_id: req.body.building_id
        },
        include: [
            {
                model: db.Building
            }
        ]
    })
    .then(function(rooms) {
        res.json(rooms);
    })
    .catch(function (error) {
        console.log(error);
    });
});

router.get("/departments/add-professor", isLoggedIn, function (req, res, next) {
    var urlTemp = (req.protocol + '://' + req.get('host') + req.originalUrl).split("/");
    var newUrl = "";
    for (var i = 0; i < urlTemp.length - 2; i++) {
        newUrl += urlTemp[i] + "/";
    }
    newUrl = newUrl.substring(0, newUrl.length-1);
    var hbsObject = {};
    hbsObject.classId = req.params.class;
    hbsObject.sourceUrl = newUrl;
    hbsObject.departments = [];
    hbsObject.buildings = [];
    // hbsObject.rooms = [];
    db.Department.findAll()
    .then(function (data) {
        data.forEach(function(department) {
           hbsObject.departments.push(department.dataValues);
        });
        return db.Building.findAll();
    })
    .then(function (data) {
        data.forEach(function(building) {
           hbsObject.buildings.push(building.dataValues);
        });
        // res.json(hbsObject);
        res.render("partials/admin/newProfessor", hbsObject );
    });
});


// localhost:8080/dashboard/admin/departments/:dept_id
router.get("/:dept_id", isLoggedIn, function(req, res, next) {
    db.Department.findOne({
        where: {
            id: req.params.dept_id
        },
        include: [{
            model: db.Course
        }, {
            model: db.Professor
        }, {
            model: db.Student
        }]
    })
    .then(function(data) {

        var hbsObject = {};
        hbsObject.admin = true;
        hbsObject.title = data.dataValues.id;
        hbsObject.desc = data.dataValues.name;

        res.render("partials/admin/departmentPage", hbsObject);
        // res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    });
});


// /departments/:id/courses - all  courses  of specific department
router.get("/:dept_id/courses", isLoggedIn, function(req, res, next) {
    db.Course.findAll({
            where: {
                department_id: req.params.dept_id
            }
        })
        .then(function(data) {
            // res.json(data);
            var hbsObject = {
                admin : true,
                courses: data,
                dept: req.params.dept_id
            };
            res.render("partials/admin/courses", hbsObject);
        })
        .catch(function(error) {
            console.log(error);
        });
});

///departments/:id/courses/:course - see specific course of specific department
router.get("/:dept_id/courses/:course_id", isLoggedIn, function(req, res, next) {
    db.Course.findOne({
            where: {
                id: req.params.course_id,
                department_id: req.params.dept_id
            },
            include: [{
                model: db.Class,
                include: [{
                    model: db.Professor,
                    include: [{
                        model: db.Person
                    }]
                }, {
                    model: db.AcademicPeriod
                }, {
                    model: db.Schedule
                }, {
                    model: db.Room
                }]
            }]
        })
        .then(function(data) {
            if (!data) {
                res.send(404);
            } else {
                res.json(data);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});
// /departments/:id/courses/:course/classes/:class - see specific class of a specific course of specific department
router.get("/:dept_id/courses/:course_id/:class_id", isLoggedIn, function(req, res, next) {
    db.Class.findOne({
            where: {
                id: req.params.class_id,
                course_id: req.params.course_id
            },
            include: [{
                model: db.Professor,
                include: [{
                    model: db.Person
                }, {
                    model: db.Room
                }]
            }, {
                model: db.Course
            }, {
                model: db.AcademicPeriod
            }, {
                model: db.Schedule
            }, {
                model: db.Room
            }, {
                model: db.Student,
                include: [{
                    model: db.Person
                }]
            }]
        })
        .then(function(data) {
            if (!data) {
                res.send(404);
            } else {
                res.json(data);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});

// /departments/:id/professors - all professors of specific department
router.get("/:dept_id/professors", isLoggedIn, function(req, res, next) {
    db.Professor.findAll({
            where: {
                department_id: req.params.dept_id
            },
            include: [{
                model: db.Person
            }, {
                model: db.Department
            }, {
                model: db.Room
            }, {
                model: db.Class
            }],
            order: ['last_name']
        })
        .then(function(data) {
            var hbsObject = {
                admin: true,
                professors: data,
                dept: req.params.dept_id
            };
            res.render("partials/admin/professors", hbsObject);
        })
        .catch(function(error) {
            console.log(error);
        });
});

///departments/:id/professors/:professor - choose a specific professors of specific department
router.get("/:dept_id/professors/:professor_id", isLoggedIn, function(req, res, next) {
    db.Professor.findOne({
            where: {
                id: req.params.professor_id,
                department_id: req.params.dept_id
            },
            include: [{
                model: db.Person
            }, {
                model: db.Department
            }, {
                model: db.Room
            }, {
                model: db.Class,
                include: [{
                    model: db.Course
                }, {
                    model: db.AcademicPeriod
                }, {
                    model: db.Schedule
                }, {
                    model: db.Room
                }]
            }]
        })
        .then(function(professor) {
            res.json(professor);
        })
        .catch(function(error) {
            console.log(error);
        })
});
// /departments/:id/professors/:professor/classes/:class - see specific class of a specific professor of specific department
router.get("/:dept_id/professors/:professor_id/:class_id", isLoggedIn, function(req, res, next) {
    db.Class.findOne({
            where: {
                id: req.params.class_id,
                professor_id: req.params.professor_id
            },
            include: [{
                model: db.Professor,
                include: [{
                    model: db.Person
                }, {
                    model: db.Room
                }]
            }, {
                model: db.Course
            }, {
                model: db.AcademicPeriod
            }, {
                model: db.Schedule
            }, {
                model: db.Room
            }, {
                model: db.Student,
                include: [{
                    model: db.Person
                }]
            }]
        })
        .then(function(data) {
            if (!data) {
                res.send(404);
            } else {
                res.json(data);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});
// /departments/:id/students - all students of specific department
router.get("/:dept_id/students", isLoggedIn, function(req, res, next) {
    db.Student.findAll({
            where: {
                department_id: req.params.dept_id
            },
            include: [{
                model: db.Person
            }, {
                model: db.Department
            }],
            order: ['last_name']
        })
        .then(function(data) {
            var hbsObject = {
                admin: true,
                students: data,
                dept: req.params.dept_id
            };
            res.render("partials/admin/students", hbsObject);
        })
        .catch(function(error) {
            console.log(error);
        });
});

// /departments/:id/students/:student - choose a specific student of specific department
router.get("/:dept_id/students/:student_id", isLoggedIn, function(req, res, next) {
    db.Student.findOne({
            where: {
                id: req.params.student_id,
                department_id: req.params.dept_id
            },
            include: [{
                model: db.Person
            }, {
                model: db.Department
            }, {
                model: db.Class,
                include: [{
                    model: db.Professor,
                    include: [{
                        model: db.Person
                    }]
                }, {
                    model: db.Course
                }, {
                    model: db.AcademicPeriod
                }, {
                    model: db.Schedule
                }, {
                    model: db.Room
                }]
            }]
        })
        .then(function(data) {
            if (!data) {
                res.send(404);
            } else {
                res.json(data);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});

// /departments/:id/students/:student/:class - see specific class of a specific student of specific department
router.get("/:dept_id/students/:student_id/:class_id", isLoggedIn, function(req, res, next) {
    db.Class.findOne({
            where: {
                id: req.params.class_id
            },
            include: [{
                model: db.Professor,
                include: [{
                    model: db.Person
                }]
            }, {
                model: db.Course
            }, {
                model: db.AcademicPeriod
            }, {
                model: db.Schedule
            }, {
                model: db.Room
            }, {
                model: db.Student,
                include: [{
                    model: db.Person
                }]
            }]
        })
        .then(function(data) {
            if (!data) {
                res.send(404);
            } else {
                res.json(data);
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
