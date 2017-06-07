module.exports = function(sequelize, DataTypes) {
    var Class = sequelize.define("class", {
        class_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        section: {
            type: DataTypes.INTEGER(4),
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