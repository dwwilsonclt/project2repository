var express = require("express");
var router = express.Router();
var db = require("../models");

// Creates
router.post("/new-department", function(req, res, next) {
    db.Department.create(req.body)
    .then(function() {
        res.redirect(req.body.sourceUrl);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/new-acdm-period", function(req, res, next) {
    db.AcademicPeriod.create(req.body)
    .then(function() {
        res.redirect(req.body.sourceUrl);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/new-schedule", function(req, res, next) {
    db.Schedule.create(req.body)
    .then(function() {
        res.redirect(req.body.sourceUrl);
    })
    .catch(function(error) {
        console.log(error);
    })
});

// Updates
router.post("/update-department/:id", function(req, res, next) {
    db.Department.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.sourceUrl);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/update-course/:id", function(req, res, next) {
    db.Course.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.sourceUrl);
    })
    .catch(function(error) {
        console.log(error);
    })
});

router.post("/update-class/:id", function(req, res, next) {
    db.Class.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        res.redirect(req.body.sourceUrl);
    })
    .catch(function(error) {
        console.log(error);
    })
});

module.exports = router;