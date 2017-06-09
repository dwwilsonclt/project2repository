var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var Professor = sequelize.define("professor", {
        phone: {
            type: DataTypes.CHAR(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        phone_extension: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
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
        }
    });

    // Professor.sync({
    // 	force: true
    // });

    return Professor;
};