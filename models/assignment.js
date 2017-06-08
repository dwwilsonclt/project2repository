module.exports = function(sequelize, DataTypes) {
    var Assignment = sequelize.define("assignment", {
        name: {
            type: DataTypes.STRING(12),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Assignment.sync({
    // 	force: true
    // });

    return Assignment;
};