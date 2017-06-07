var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    var Person = sequelize.define("person", {
        person_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        first_name: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        gender: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        area_code: {
            type: DataTypes.CHAR(3),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.CHAR(7),
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
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        city: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        state: {
            type: DataTypes.STRING(20),
            validate: {
                notEmpty: true,
                len: [2]
            }
        },
        zip_code: {
            type: DataTypes.CHAR(5),
            validate: {
                notEmpty: true,
                len: [5]
            }
        },
        country: {
            type: DataTypes.STRING(30),
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

    // Person.sync({
    // 	force: true
    // });

    return Person;
};