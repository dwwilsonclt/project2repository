$(document).ready(function() {
    $("#register-back-btn").click(function(event) {
        event.preventDefault();
        location.href = "/signin";
    });
});