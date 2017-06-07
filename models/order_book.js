module.exports = function(sequelize, DataTypes) {
    var OrderBook = sequelize.define("order_book", {
        quantity: {
            type: DataTypes.INTEGER(2)
        }
    });

    // OrderBook.sync({
    // 	force: true
    // });

    return OrderBook;
};