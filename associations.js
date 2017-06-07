module.exports = function(db) {
    db.Person.hasMany(db.Student, {
        onDelete: "cascade"
    });
    db.Person.hasMany(db.Professor, {
        onDelete: "cascade"
    });
    db.Person.hasMany(db.Admin, {
        onDelete: "cascade"
    });
    db.Person.hasMany(db.BookstoreAdmin, {
        onDelete: "cascade"
    });

    db.School.hasMany(db.Building, {
        onDelete: "cascade"
    });
    db.School.hasMany(db.Department, {
        onDelete: "cascade"
    });
    db.School.hasMany(db.AcademicPeriod, {
        onDelete: "cascade"
    });
    db.School.hasOne(db.Bookstore, {
        onDelete: "cascade"
    });
    db.School.hasMany(db.Admin, {
        onDelete: "cascade"
    });

    db.Building.belongsTo(db.School, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Building.hasMany(db.Room, {
        onDelete: "cascade"
    });

    db.Room.belongsTo(db.Building, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Room.hasMany(db.Professor, {
        onDelete: "cascade"
    });
    db.Room.hasMany(db.Class, {
        onDelete: "cascade"
    });

    db.Department.belongsTo(db.School, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Department.hasMany(db.Course, {
        onDelete: "cascade"
    });
    db.Department.hasMany(db.Professor, {
        onDelete: "cascade"
    });
    db.Department.hasMany(db.Student, {
        onDelete: "cascade"
    });

    db.AcademicPeriod.belongsTo(db.School, {
        foreignKey: {
            allowNull: false
        }
    });
    db.AcademicPeriod.hasMany(db.Schedule, {
        onDelete: "cascade"
    });

    db.Schedule.belongsTo(db.AcademicPeriod, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Schedule.hasMany(db.Class, {
        onDelete: "cascade"
    });

    db.Bookstore.belongsTo(db.School, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Bookstore.hasMany(db.BookstoreAdmin, {
        onDelete: "cascade"
    });
    db.Bookstore.hasMany(db.Book, {
        onDelete: "cascade"
    });

    db.Admin.belongsTo(db.Person, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Admin.belongsTo(db.School, {
        foreignKey: {
            allowNull: false
        }
    });

    db.BookstoreAdmin.belongsTo(db.Person, {
        foreignKey: {
            allowNull: false
        }
    });
    db.BookstoreAdmin.belongsTo(db.Bookstore, {
        foreignKey: {
            allowNull: false
        }
    });

    db.Course.belongsTo(db.Department, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Course.hasMany(db.Class, {
        onDelete: "cascade"
    });

    db.Professor.belongsTo(db.Person, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Professor.belongsTo(db.Department, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Professor.belongsTo(db.Room, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Professor.hasMany(db.Class, {
        onDelete: "cascade"
    });
    db.Professor.hasMany(db.Order, {
        onDelete: "cascade"
    });

    db.Student.belongsTo(db.Person, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Student.belongsTo(db.Department, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Student.belongsToMany(db.Class, {
        through: db.ClassStudent
    });
    db.Student.belongsToMany(db.Class, {
        through: db.AttendanceStudent
    });
    db.Student.belongsToMany(db.Assignment, {
        through: db.AssignmentStudent
    });
    db.Student.hasMany(db.Order, {
        onDelete: "cascade"
    });

    db.Class.belongsTo(db.Department, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Class.belongsTo(db.Course, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Class.belongsTo(db.Professor, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Class.belongsTo(db.Schedule, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Class.belongsTo(db.Room, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Class.belongsTo(db.Book, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Class.belongsToMany(db.Student, {
        through: db.ClassStudent
    });
    db.Class.belongsToMany(db.Student, {
        through: db.AttendanceStudent
    });
    db.Class.hasMany(db.Coursework, {
        onDelete: "cascade"
    });
    db.Class.hasMany(db.BookRequest, {
        onDelete: "cascade"
    });

    db.Coursework.belongsTo(db.Class, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Coursework.hasMany(db.Assignment, {
        onDelete: "cascade"
    });

    db.Assignment.belongsTo(db.Coursework, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Assignment.belongsToMany(db.Student, {
        through: db.AssignmentStudent
    });

    db.BookRequest.belongsTo(db.Class, {
        foreignKey: {
            allowNull: false
        }
    });
    db.BookRequest.belongsTo(db.Book, {
        foreignKey: {
            allowNull: false
        }
    });

    db.Book.belongsTo(db.Bookstore, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Book.hasMany(db.Class);
    db.Book.hasMany(db.BookRequest);
    db.Book.belongsToMany(db.Order, {
        through: db.OrderBook
    });

    db.Order.belongsTo(db.Professor, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Order.belongsTo(db.Student, {
        foreignKey: {
            allowNull: false
        }
    });
    db.Order.belongsToMany(db.Book, {
        through: db.OrderBook
    });
};
