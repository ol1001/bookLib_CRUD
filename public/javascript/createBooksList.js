$(function () {

    //Get JSON data from server using an AJAX HTTP GET request
    $.getJSON("http://localhost:8083/getbook", function(data){
        var orderedListOfBooks = $('ol.bookList');

        $.each(data, function (i, bookItem) {

            var listItem = $('<li/>')
                .appendTo(orderedListOfBooks)
                .text(bookItem.author+' '+'"'+bookItem.title+'"');

        });
    });
});