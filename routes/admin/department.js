var express = require("express");
var router = express.Router();
var db = require("../../models");

// all departments
router.get("/", isLoggedIn, function(req, res, next) {
    db.Department.findAll()
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            console.log(error);
        });
});

// specific department
router.get("/:dept_id", isLoggedIn, function(req, res, next) {
    db.Department.findOne({
        where: {
            id: req.params.dept_id
        }
    })
    .then(function(data) {
        res.json(data);
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
        }]
    })
    .then(function(data) {
        res.json(data);
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
        res.json(data);
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
        include: [
            {
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
            }
        ]
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
///departments/:id/professors/:professor - choose a specific professors of specific department
router.get("/:dept_id/professors/:professor_id", isLoggedIn, function(req, res, next) {
    db.Professor.findOne({
        where: {
            id: req.params.professor_id,
            department_id: req.params.dept_id
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
                include: [{
                    model: db.Course
                }, {
                    model: db.AcademicPeriod
                }, {
                    model: db.Schedule
                }, {
                    model: db.Room
                }]
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

// /departments/:id/students - all students of specific department
router.get("/:dept_id/students", isLoggedIn, function(req, res, next) {
    db.Student.findAll({
        where: {
            department_id: req.params.dept_id
        },
        include: [{
            model: db.Person

        }]
    })
    .then(function(data) {
        res.json(data);
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
// /departments/:id/courses/:course/classes - see all classes for specific course of specific department
router.get("/:dept_id/courses/:course_id/classes", isLoggedIn, function(req, res, next) {
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
router.get("/:dept_id/courses/:course_id/classes/:class_id", isLoggedIn, function(req, res, next) {
    db.Class.findOne({
        where: {
            id: req.params.class_id,
            course_id: req.params.course_id
        },
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
