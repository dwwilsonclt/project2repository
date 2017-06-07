module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("order", {
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Order.sync({
    // 	force: true
    // });

    return Order;
};