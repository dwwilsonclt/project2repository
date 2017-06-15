$(document).ready(function() {
    $("#period").on("change", function() {
        updateClassList();
    });

    $("#department").on("change", function() {
        $.post("/dashboard/student/enroll/setDepartment", {
            department_id:  $("#department").val()
        })
        .done(function(courses) {
            $("#course").empty();
            courses.forEach(function(course) {
                var option = $("<option>")
                .attr("value", course.id)
                .text(course.department_id + " " + course.course_number + " - " + course.name);
                $("#course").append(option);
            });
            updateClassList();
        });
    });

    $("#course").on("change", function() {
        updateClassList();
    });

    function updateClassList() {
        $.post("/dashboard/student/enroll/setCourse", {
            course_id:  $("#course").val(),
            academic_period_id: $("#period").val()
        })
         .done(function(classes) {
             $("#class").empty();
             classes.forEach(function(classInfo) {
                 var option = $("<option>")
                 .attr("value", classInfo.id)
                 .text(classInfo.course.department_id + " " + classInfo.course.course_number + "-" + classInfo.section);
                 $("#class").append(option);
             });
         });
    }
});

