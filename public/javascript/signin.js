$(document).ready(function() {
    $("#register-btn").click(function(event) {
        event.preventDefault();
        location.href = "/signup";
    });

    $("#forget-password").click(function(event) {
        event.preventDefault();
        location.href = "/forgot-password";
    });
});