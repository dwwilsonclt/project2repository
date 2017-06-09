var express = require("express");
var router = express.Router();
var db = require("../models");

// Sample query
router.get("/student/:id", function(req, res, next) {
    db.Student.findOne({
        where: {
            id: req.params.id //search for 29
        },
        include: [
            {
                model: db.Class,
                include: [
                    {
                        model: db.Course
                    },
                    {
                        model: db.Professor,
                        include: [
                            {
                                model: db.Person
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(function(student) {
        res.json(student);
    })
    .catch(function(error) {
        console.log(error);
    });
});

module.exports = router;