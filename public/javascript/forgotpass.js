$(document).ready(function() {
    $("#back-btn").click(function(event) {
        event.preventDefault();
        location.href = "/signin";
    });
});