module.exports = function(sequelize, DataTypes) {
    var Coursework = sequelize.define("coursework", {
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