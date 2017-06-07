module.exports = function(sequelize, DataTypes) {
    var Bookstore = sequelize.define("bookstore", {
        bookstore_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
    });

    // Bookstore.sync({
    // 	force: true
    // });

    return Bookstore;
};