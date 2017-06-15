'use strict';
var env       = require("../config/env");
var Sequelize = require('sequelize');
var db        = {};

var sequelize = new Sequelize (
env.DATABASE_NAME,
env.DATABASE_USERNAME,
env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    define: {
        underscored: true
    }
});

db.AcademicPeriod = require("./academic_period")(sequelize, Sequelize);
db.Admin          = require("./admin")(sequelize, Sequelize);
db.Assignment     = require("./assignment")(sequelize, Sequelize);
db.Book           = require("./book")(sequelize, Sequelize);
db.BookRequest    = require("./book_request")(sequelize, Sequelize);
db.Bookstore      = require("./bookstore")(sequelize, Sequelize);
db.BookstoreAdmin = require("./bookstore_admin")(sequelize, Sequelize);
db.Building       = require("./building")(sequelize, Sequelize);
db.Class          = require("./class")(sequelize, Sequelize);
db.Course         = require("./course")(sequelize, Sequelize);
db.Coursework     = require("./coursework")(sequelize, Sequelize);
db.Department     = require("./department")(sequelize, Sequelize);
db.Order          = require("./order")(sequelize, Sequelize);
db.Person         = require("./person")(sequelize, Sequelize);
db.Professor      = require("./professor")(sequelize, Sequelize);
db.Room           = require("./room")(sequelize, Sequelize);
db.Schedule       = require("./schedule")(sequelize, Sequelize);
db.School         = require("./school")(sequelize, Sequelize);
db.Student        = require("./student")(sequelize, Sequelize);

// Join Tables
db.ClassStudent      = require("./class_student")(sequelize, Sequelize);
db.AttendanceStudent = require("./attendance_student")(sequelize, Sequelize);
db.AssignmentStudent = require("./assignment_student")(sequelize, Sequelize);
db.OrderBook         = require("./order_book")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
