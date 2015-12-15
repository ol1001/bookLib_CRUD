$(function () {
    $('table.bookList').on('click', 'td a.deleteItem', deleteItem)
                       .on('click', 'td a.addItem', addItem)
                       .on('click', 'td a.updateItem', updateItem)
                       .on('click', 'td a.saveItem', saveItem);
});

function saveItem(event) {
    event.preventDefault();

    var updateBook = {
        'title': $('td.updating')[1].textContent,
        'author': $('td.updating')[0].textContent,
        'genre': $('td.updating')[3].textContent,
        'published': $('td.updating')[2].textContent
    };

    $.ajax({
        url:"/update/" + $(this).attr('rel'),
        type: "POST",
        data: updateBook
    }).done(function(response){
        window.location = "/";
    }).error(function(err){
        console.log("Error " + err);
    });

}
function updateItem(event) {
    event.preventDefault();

    // make cells editable
    var thisTdArray = $(this).parentsUntil('table')[1].childNodes;
    for (var i=1; i <5; i++) {
        thisTdArray[i].setAttribute('contenteditable', 'true');
        thisTdArray[i].className = 'updating';
    }

    // change class name
    $(this)[0].className = 'saveItem';
    // change icon image
    var img = $(this)[0].childNodes[0];
    img.setAttribute('src', '../i/save.png');
}
function deleteItem(event){
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this user?');

    if (confirmation === true) {

        $.ajax({
            type: "DELETE",
            url:"/delete/" + $(this).attr('rel')
        }).done(function(response){
                window.location = "/";
            }).error(function(err){
                console.log("Error " + err);
            });
    }
    else {
        return false;
    }
}

function addItem(event) {
    event.preventDefault();

    var newBook = {
        'title': $('td.title')[0].textContent,
        'author': $('td.author')[0].textContent,
        'genre': $('td.genre')[0].textContent,
        'published': $('td.published')[0].textContent
    };

    $.ajax({
        url: "/save",
        type: "POST",
        data: newBook
    }).done(function(response){
        window.location = "/";
    }).error(function(err){
        console.log("Error " + err);
    });

}