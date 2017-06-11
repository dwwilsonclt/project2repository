var express = require("express");
var router = express.Router();
var db = require("../../models");

router.get("/", isLoggedIn, function (req, res, next) {
    db.Department.findAll()
      .then(function(data) {
          res.json(data);
      })
      .catch(function(error) {
          console.log(error);
      });
});

router.get("/:department", isLoggedIn, function (req, res, next) {
    db.Student.findAll({
        where: {
            department_id: req.params.department
        },
        include: [
            {
                model: db.Person
            },
            {
                model: db.Class
            }
        ]
    })
      .then(function(student) {
          res.json(student);
      })
      .catch(function(error) {
          console.log(error);
      })
});

router.get("/:department/:student", isLoggedIn, function (req, res, next) {
    db.Student.findOne({
        where: {
            id: req.params.student,
            department_id: req.params.department
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
          res.json(data);
      }
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/:department/:student/:class", isLoggedIn, function(req, res, next) {
    db.Class.findOne({
        where: {
            id: req.params.class
        },
        include: [{
            model: db.Professor,
            include: [{
                model: db.Person
            },{
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;