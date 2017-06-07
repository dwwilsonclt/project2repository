module.exports = function(sequelize, DataTypes) {
    var BookRequest = sequelize.define("book_request", {
        book_request_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        quantity: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // BookRequest.sync({
    // 	force: true
    // });

    return BookRequest;
};