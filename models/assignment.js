module.exports = function(sequelize, DataTypes) {
    var Assignment = sequelize.define("assignment", {
        assignment_id: {
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