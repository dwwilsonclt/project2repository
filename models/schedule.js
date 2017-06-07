module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define("schedule", {
        days: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        begin_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Schedule.sync({
    // 	force: true
    // });

    return Schedule;
};