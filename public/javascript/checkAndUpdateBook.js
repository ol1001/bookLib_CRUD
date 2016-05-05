$(function () {
    var locationPath = window.location.pathname;
    var action = null;

    (locationPath == "/delete.html") ? action = "delete" : action = "update";
    console.log(action);

    document.getElementById("selectBook").addEventListener("click", function (event) {
        event.preventDefault();

        var bookForUpdating = [];

        $("input[name='book']").each(function () {
            if (($(this).prop("checked")) == true) {
                bookForUpdating.push($(this).attr('id'));
            }
        });

        if (action == "update") {
            window.location = "create.html?" + bookForUpdating[0];
        } else if (action == "delete") {
            console.log(bookForUpdating);
            $.ajax({
                url: "/delete/" + bookForUpdating,
                type: "GET",
                data: bookForUpdating
            }).done(function (response) {
                console.log("Complete successfully");
                window.location = "/read.html";
            }).error(function (err) {
                console.log("Error " + err);
            })
        }

    });
});

