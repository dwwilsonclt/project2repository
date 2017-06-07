module.exports = function(sequelize, DataTypes) {
    var Coursework = sequelize.define("coursework", {
        coursework_id: {
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
            type: DataTypes.STRING(12),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        weight: {
            type: DataTypes.FLOAT(3, 2),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Coursework.sync({
    // 	force: true
    // });

    return Coursework;
};