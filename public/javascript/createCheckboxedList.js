$(function () {
    var locationPath = window.location.pathname;
    var typeAttribute = null;
    (locationPath == "/update.html") ? typeAttribute = "radio" : typeAttribute="checkbox";

    $.getJSON("http://localhost:8083/getbook", function (data) {
        var listOfBooksCheckboxed = $('fieldset#selectItem');

        $.each(data, function (i, bookItem) {

            var inputItem = $('<input/>')
                .attr('type', typeAttribute)
                .attr('id', bookItem._id)
                .attr('name', 'book')
                .appendTo(listOfBooksCheckboxed);
            var labelItem = $('<label/>')
                .attr('class', "editItem")
                .attr('for', bookItem._id)
                .text(bookItem.author + ' ' + '"' + bookItem.title + '"')
                .appendTo(listOfBooksCheckboxed);
            var brakeElement = $('<br/>')
                .appendTo(listOfBooksCheckboxed);
        });
    });

});