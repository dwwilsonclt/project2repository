module.exports = function(sequelize, DataTypes) {
    var Department = sequelize.define("department", {
        department_id: {
            type: DataTypes.STRING(5),
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
        }
    });

    // Department.sync({
    // 	force: true
    // });

    return Department;
};