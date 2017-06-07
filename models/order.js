module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("order", {
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