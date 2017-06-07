module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define("room", {
        room_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        room_number: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Room.sync({
    // 	force: true
    // });

    return Room;
};