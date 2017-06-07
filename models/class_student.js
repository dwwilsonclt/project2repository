module.exports = function(sequelize, DataTypes) {
    var ClassStudent = sequelize.define("class_student", {});

    // ClassStudent.sync({
    // 	force: true
    // });

    return ClassStudent;
};