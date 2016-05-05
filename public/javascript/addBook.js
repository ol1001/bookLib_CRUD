$(function () {
    var action = "save";
    var parameterId = window.location.search;
    parameterId = parameterId.replace(/^\?/, "");
    if (parameterId) {
        action = "update";
    }
    addAction(parameterId, action);
});

function addAction(parameterId, action) {
    var serverSideHandler = "http://localhost:8083/save";
    if (action == "update") {
        $.getJSON("http://localhost:8083/getbook/" + "" + parameterId, function (data) {
            $('#title').val(data[0].title);
            $('#author').val(data[0].author);
            $('#genre').val(data[0].genre);
            $('#pages').val(data[0].pages);
            $('#published').val(data[0].published);
        });
        serverSideHandler = "http://localhost:8083/update";
    }

    $('button#addBook').on('click', function (event) {
        event.preventDefault();
        var newBook = {
            'title': $('#title').val(),
            'author': $('#author').val(),
            'genre': $('#genre').val(),
            'pages': $('#pages').val(),
            'published': $('#published').val()
        };
        if (action == "update") {
            newBook._id = parameterId
        }

        $.ajax({
            url: serverSideHandler,
            type: "POST",
            data: newBook
        }).done(function (response) {
            console.log("Complete successfully");
            window.location = "/read.html";
        }).error(function (err) {
            console.log("Error " + err);
        });
    });

}