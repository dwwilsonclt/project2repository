var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("user", {
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
                isEmail: true
			}
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                notEmpty: true,
				len: [2]
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

	// User.sync({
	// 	force: true
	// });

	return User;
};
