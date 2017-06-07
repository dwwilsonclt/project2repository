var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var Professor = sequelize.define("professor", {
        phone: {
            type: DataTypes.CHAR(10),
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
    },{
        classMethods: {
            encryptPassword: function(password, cb) {
                bcrypt.hash(password, bcrypt.genSaltSync(5), null, function(error, hash) {
                    if (error) {
                        return done(error);
                    } else {
                        cb(hash);
                    }
                });
            },
            validPassword: function(password, passwd, cb) {
                bcrypt.compare(password, passwd, function(error, isMatch) {
                    if (error) console.log(error);
                    cb(isMatch);
                });
            }
        }
    });

    // Professor.sync({
    // 	force: true
    // });

    return Professor;
};