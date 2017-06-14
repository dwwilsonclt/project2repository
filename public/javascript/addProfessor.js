$(document).ready(function() {
    $("#building").on("change", function() {
        $.post("/dashboard/admin/departments/departments/add-professor/setBldg", {
            building_id:  $("#building").val()
        })
        .done(function(rooms) {
            $("#room").empty();
            rooms.forEach(function(room) {
                var option = $("<option>")
                .attr("value", room.id)
                .text(room.building.name + " " + room.room_number);
                $("#room").append(option);
            });
        });
    });
});

