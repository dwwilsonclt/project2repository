module.exports = function(sequelize, DataTypes) {
    var AttendanceStudent = sequelize.define("attendance_student", {
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