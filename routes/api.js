var express = require("express");
var router = express.Router();
var db = require("../models");

// Creates
router.post("/new-department", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;
    db.Department.create(req.body)
    .then(function() {
        res.redirect(url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/new-professor", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;

    db.Person.encryptPassword(req.body.password, function(hash) {
        db.Person.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            phone: req.body.phone_p,
            email: req.body.email_p,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            country: req.body.country
        })
        .then(function(person) {
            return db.Professor.create({
                phone: req.body.phone_edu,
                phone_extension: req.body.phone_extension,
                email: req.body.email_edu,
                password: hash,
                person_id: person.dataValues.id,
                room_id: req.body.room_id,
                department_id: req.body.department_id
            });
        })
        .then(function() {
            res.redirect(url);
        })
        .catch(function(error) {
            console.log(error);
        });
    });
});

router.post("/new-student", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;
    db.Student.create(req.body)
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/new-course", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;
    db.Course.create(req.body)
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/new-class", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;
    db.Class.create(req.body)
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/new-building", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;
    db.Building.create(req.body)
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/new-room", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;
    db.Room.create(req.body)
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/new-acdm-period", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;
    db.AcademicPeriod.create(req.body)
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/new-schedule", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;  
    db.Schedule.create(req.body)
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/new-asgmnt-topic", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body["sourceUrl"];

    req.body.weight = parseFloat(parseInt(req.body.weight) / 100);
    req.body.class_id = parseInt(req.body.class_id);
    db.Coursework.create(req.body)
    .then(function() {
        res.redirect(url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

router.post("/new-assignment", function(req, res, next) {
    var url = req.body.sourceUrl;
    var classId = req.body.class_id;
    delete req.body["sourceUrl"];
    delete req.body["class_id"];
    var assignmentId;
    req.body.due_date = new Date(req.body.due_date);
    req.body.coursework_id = parseInt(req.body.coursework_id);
    db.Assignment.create(req.body)
    .then(function(assignment) {
        assignmentId = assignment.dataValues.id;
        return db.Class.findOne({
            where: {
                id: classId
            },
            include: [
                {
                    model: db.Student
                }
            ]
        });
    })
    .then(function(classInfo) {
        var studentAssignments = [];
        classInfo.dataValues.students.forEach(function(student) {
            studentAssignments.push({
                student_id: student.id,
                assignment_id: assignmentId
            });
        });
        return db.AssignmentStudent.bulkCreate(studentAssignments);
    })
    .then(function() {
        res.redirect(url);
    })
    .catch(function(error) {
        console.log(error);
    });
});

// Updates
router.post("/update-department/:id", function(req, res, next) {
     var url = req.body.sourceUrl;
    delete req.body.sourceUrl; 
    db.Department.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/update-course/:id", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;  
    db.Course.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/update-class/:id", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;  
    db.Class.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/update-professor/:id", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;  
    db.Professor.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/update-student/:id", function(req, res, next) {
    var url = req.body.sourceUrl;
    delete req.body.sourceUrl;  
    db.Student.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.url);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/assignment-grade", function(req, res, next) {
    console.log(req.body);
    var url = req.body.sourceUrl;
    delete req.body["sourceUrl"];
    var grades = [];
    for (var i = 0; i < req.body.grade.length; i++) {
        var obj = {
            grade: req.body.grade[i] !== "" ? parseInt(req.body.grade[i]) : null,
            student_id: parseInt(req.body.student_id[i]),
            assignment_id: parseInt(req.body.assignment_id)
        };
        grades.push(obj);
    }
    updateGrades(0, grades);
    res.redirect(url);
});

function updateGrades(i, grades) {
    if (i < grades.length) {
        db.AssignmentStudent.update({
            grade: grades[i].grade
        },{
            where: {
                student_id: grades[i].student_id,
                assignment_id: grades[i].assignment_id
            }
        })
        .then(function() {
            i++;
            updateGrades(i, grades);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

module.exports = router;