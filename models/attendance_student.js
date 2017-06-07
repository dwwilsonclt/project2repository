module.exports = function(sequelize, DataTypes) {
    var AttendanceStudent = sequelize.define("attendance_student", {
        class_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        student_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        present: {
            type: DataTypes.BOOLEAN
        }
    });

    // AttendanceStudent.sync({
    // 	force: true
    // });

    return AttendanceStudent;
};