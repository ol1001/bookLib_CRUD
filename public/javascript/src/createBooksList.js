$(function () {

    $.getJSON("http://localhost:8083/getbook", function (data) {

        var table = $('table.bookList');
        var tableRow = '';
        var count = 0;

        $.each(data, function (index, item) {
            tableRow += '<tr><td>' + ++index +
            '</td><td>' + item.author +
            '</td><td><a href="#" class="open">' + item.title +
            '<img class="open" src="../../i/open.png"></a></td><td>' + item.published +
            '</td><td>' + item.genre +
            '</td><td><a href="#" class="deleteItem" rel="' + this._id + '"><img src="../../i/trash.png" alt="Delete"/></a>' +
            '<br/><a href="#" class="updateItem" rel="' + this._id + '"><img src="../../i/edit.png" alt="Edit"/></a></td></tr>';
            count = index;
        });
        var lastRow = '<tr><td class="index" >' + ++count + '</td>' +
            '<td class="author" contenteditable="true"></td>' +
            '<td class="title" contenteditable="true"></td>' +
            '<td class="published" contenteditable="true"></td>' +
            '<td class="genre" contenteditable="true"></td>' +
            '<td><a href="#" class="addItem"><img src="../../i/add.png" alt="Add"/></a><br/>' +
            '<a href="#" class="uploadItem"><img src="../../i/upload.png" alt="Upload"/></a></td></tr>';

        table.append(tableRow);
        table.append(lastRow);
    });

});








