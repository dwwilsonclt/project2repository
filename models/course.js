module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("course", {
        course_number: {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        department_id: {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
//DWW update
    // Course.sync({
    // 	force: true
    // });

    return Course;
};