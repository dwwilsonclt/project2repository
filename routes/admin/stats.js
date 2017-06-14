var express = require("express");
var router = express.Router();
var db = require("../../models");

router.get("/", isLoggedIn, function(req, res, next) {
    res.render("admin/stats");
});

router.post("/chart/:id", isLoggedIn, function(req, res, next) {
    switch(req.params.id) {
        case "1":
            db.Student.findAll({
                include: [
                    {
                        model: db.Person
                    }
                ]
            })
            .then(function (students) {
                var data = [];
                var female = 0;
                var male = 0;
                students.forEach(function(student) {
                    if (student.person.gender === "F") {
                        female++;
                    } else {
                        male++;
                    }
                });
                data.push({
                    gender: "Female",
                    students: female
                });
                data.push({
                    gender: "Male",
                    students: male
                });
                res.json(data);
            })
            .catch(function(error) {
                console.log(error);
            });
            break;

        case "2":
            db.Student.findAll()
            .then(function (students) {
                var data = [];
                var freshman = 0;
                var sophomore = 0;
                var junior = 0;
                var senior = 0;
                students.forEach(function(student) {
                    switch(student.class_level) {
                        case "FRESHMAN":
                            freshman++;
                            break;

                        case "SOPHOMORE":
                            sophomore++;
                            break;

                        case "JUNIOR":
                            junior++;
                            break;

                        case "SENIOR":
                            senior++;
                            break;
                    }
                });
                var fields = ["Freshman", "Sophomore", "Junior", "Senior"];
                var values = [freshman, sophomore, junior, senior];
                for (var i = 0; i < fields.length; i++) {
                    data.push({
                        class_level: fields[i],
                        students: values[i]
                    });
                }
                res.json(data);
            })
            .catch(function(error) {
                console.log(error);
            });
            break;

        case "3":
            db.Student.findAll({
                include: [
                    {
                        model: db.Department
                    }
                ]
            })
            .then(function (students) {
                var data = [];
                var departments = [];
                var values = [];
                students.forEach(function(student) {
                    if (departments.indexOf(student.department.name) === -1) {
                        departments.push(student.department.name);
                        values.push(1);
                    } else {
                        var index = departments.indexOf(student.department.name);
                        values[index]++;
                    }
                });
                for (var i = 0; i < departments.length; i++) {
                    data.push({
                        department: departments[i],
                        students: values[i]
                    });
                }
                res.json(data);
            })
            .catch(function(error) {
                console.log(error);
            });
            break;
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;