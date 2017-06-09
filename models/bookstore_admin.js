var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var BookstoreAdmin = sequelize.define("bookstore_admin", {
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

    // BookstoreAdmin.sync({
    // 	force: true
    // });

    return BookstoreAdmin;
};