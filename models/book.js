module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("book", {
        title: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        author: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        publish_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        quantity: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    // Book.sync({
    // 	force: true
    // });

    return Book;
};