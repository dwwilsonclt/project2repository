'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};
console.log(basename);
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(function(file) {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
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
