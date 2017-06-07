module.exports = function(sequelize, DataTypes) {
    var Building = sequelize.define("building", {
        building_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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

    // Building.sync({
    // 	force: true
    // });

    return Building;
};