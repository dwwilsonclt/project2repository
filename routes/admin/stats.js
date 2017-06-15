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
            db.Department.findAll({
                include: [
                    {
                        model: db.Student
                    }
                ]
            })
            .then(function (departments) {
                var data = [];
                var departmentNames = [];
                var values = [];
                departments.forEach(function(department) {
                    departmentNames.push(department.name);
                    values.push(department.students.length);
                });
                for (var i = 0; i < departmentNames.length; i++) {
                    data.push({
                        department: departmentNames[i],
                        students: values[i]
                    });
                }
                res.json(data);
            })
            .catch(function(error) {
                console.log(error);
            });
            break;

        case "4":
            db.Department.findAll({
                include: [
                    {
                        model: db.Professor
                    }
                ]
            })
            .then(function (departments) {
                var data = [];
                var departmentNames = [];
                var values = [];
                departments.forEach(function(department) {
                    departmentNames.push(department.name);
                    values.push(department.professors.length);
                });
                for (var i = 0; i < departmentNames.length; i++) {
                    data.push({
                        department: departmentNames[i],
                        professors: values[i]
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