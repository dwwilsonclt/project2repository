$(document).ready(function() {
    $("#department").on("change", function() {
        $.post("/dashboard/student/enroll", {
            department_id:  $("#department").val()
        })
        // .done(function() {
        //     location.href = "/dashboard/student/enroll";
        // });
    });
});