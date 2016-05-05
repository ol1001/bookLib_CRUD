$(function () {

    $.getJSON("http://localhost:8083/getbook", function (data) {
        var orderedListOfBooks = $('ol.bookList');

        $.each(data, function (i, bookItem) {

            $('<li/>')
                .appendTo(orderedListOfBooks)
                .text(bookItem.author + ' ' + '"' + bookItem.title + '"');

        });
    });
});