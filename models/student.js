var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define("student", {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        date_enrolled: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        class_level: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Student.sync({
    // 	force: true
    // });

    return Student;
};