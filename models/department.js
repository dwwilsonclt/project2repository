module.exports = function(sequelize, DataTypes) {
    var Department = sequelize.define("department", {
        id: {
            type: DataTypes.STRING(5),
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING(20),
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