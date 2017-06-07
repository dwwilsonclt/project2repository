module.exports = function(sequelize, DataTypes) {
    var Building = sequelize.define("building", {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Building.sync({
    // 	force: true
    // });

    return Building;
};