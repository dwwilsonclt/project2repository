module.exports = function(sequelize, DataTypes) {
    var AssignmentStudent = sequelize.define("assignment_student", {
        grade: {
            type: DataTypes.INTEGER(3)
        }
    });

    // AssignmentStudent.sync({
    // 	force: true
    // });

    return AssignmentStudent;
};