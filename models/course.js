module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("course", {
        department_id: {
            type: DataTypes.STRING(5),
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        course_id: {
            type: DataTypes.INTEGER(5),
            unique: true,
            allowNull: false,
            primaryKey: true,
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

    // Course.sync({
    // 	force: true
    // });

    return Course;
};