module.exports = function(sequelize, DataTypes) {
    var BookRequest = sequelize.define("book_request", {
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