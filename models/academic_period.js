module.exports = function(sequelize, DataTypes) {
    var AcademicPeriod = sequelize.define("academic_period", {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        begin_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // AcademicPeriod.sync({
    // 	force: true
    // });

    return AcademicPeriod;
};