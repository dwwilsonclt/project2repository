module.exports = function(sequelize, DataTypes) {
    var Class = sequelize.define("class", {
        section: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        capacity: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        enrolled: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
        }
    });

    // Class.sync({
    // 	force: true
    // });

    return Class;
};