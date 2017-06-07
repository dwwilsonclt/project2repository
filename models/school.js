module.exports = function(sequelize, DataTypes) {
    var School = sequelize.define("school", {
        school_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
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
    });

    // School.sync({
    // 	force: true
    // });

    return School;
};