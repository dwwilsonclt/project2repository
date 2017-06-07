module.exports = function(sequelize, DataTypes) {
    var Bookstore = sequelize.define("bookstore", {});

    // Bookstore.sync({
    // 	force: true
    // });

    return Bookstore;
};