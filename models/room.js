module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define("room", {
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