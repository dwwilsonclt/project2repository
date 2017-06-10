var moment = require("moment");
var db = require("../models");
require("../associations")(db);

db.Student.findOne({
    where: {
        email: 'nshellidays@eagleu.edu'
    },
    include: [
        {
            model  : db.Class,
            include: [
                {
                    model: db.Course
                },
                {
                    model: db.AcademicPeriod
                },
                {
                    model: db.Schedule
                },
                {
                    model: db.Room
                },
                {
                    model: db.Professor,
                    include: [
                        {
                            model: db.Person
                        }
                    ]
                }
            ]
        }
    ]
})
.then(function(data) {
    var student = data.dataValues;
    var classNames = "";
    console.log("");
    for (var i = 0; i < student.classes.length; i++) {
        console.log("Class: " + student.classes[i].course.department_id + " " + student.classes[i].course.course_number + " -- " + student.classes[i].course.name);
        console.log("Semester: " + student.classes[i].academic_period.name);
        console.log("Days: " + student.classes[i].schedule.days);
        console.log("Hours: " + moment(student.classes[i].schedule.begin_time, "HH:mm:ss").format("h:mm A") + " - " + moment(student.classes[i].schedule.end_time, "HH:mm:ss").format("h:mm A"));
        console.log("Location: " + student.classes[i].room.building_id + " " + student.classes[i].room.room_number);
        console.log("Professor: " + student.classes[i].professor.person.first_name + " " + student.classes[i].professor.person.last_name);
        console.log("");
    }
})
.catch(function(error) {
    console.log(error);
});
