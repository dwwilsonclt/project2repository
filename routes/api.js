var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/school/:id", function(req, res, next) {
    db.School.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: db.Department
            },
            {
                model: db.AcademicPeriod
            },
            {
                model: db.Building
            }
        ]
    })
    .then(function(school) {
        res.json(school);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/department/:id", function(req, res, next) {
    db.Department.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: db.Course
            }
        ]
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/bldg/:id", function(req, res, next) {
    db.Building.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: db.Room
            }
        ]
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/room/:id", function(req, res, next) {
    db.Room.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: db.Building
            },
            {
                model: db.Class
            }
        ]
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/acdm-period/:id", function(req, res, next) {
    db.AcademicPeriod.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: db.Class
            }
        ]
    })
      .then(function(data) {
          res.json(data);
      })
      .catch(function(error) {
          console.log(error);
      });
});

router.get("/course/:dept/:id", function(req, res, next) {
    db.Course.findOne({
        where: {
            id: req.params.id,
            department_id: req.params.dept
        },
        include: [
            {
                model: db.Class
            }
        ]
    })
      .then(function(data) {
          res.json(data);
      })
      .catch(function(error) {
          console.log(error);
      });
});

router.get("/class/:id", function(req, res, next) {
    db.Class.findOne({
        where: {
            id: req.params.id
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
                        model: db.Room
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
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.get("/student/:id", function(req, res, next) {
    db.Student.findOne({
        where: {
            id: req.params.id
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
                    },
                    {
                        model: db.Professor
                    }
                ]
            }
        ]
    })
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        console.log(error);
    });
});

module.exports = router;