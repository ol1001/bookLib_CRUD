var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express();

MongoClient.connect('mongodb://localhost:27017/crudapp', function (err, db) {
    "use strict";
    if (err) throw err;

    var dbCollection = db.collection('books');

    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/public/views'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/', function (req, res, next) {
        res.sendFile(__dirname + "/public/views/read.html");
    });

    app.post('/save', function (req, res) {

        var newBook = req.body;
        dbCollection.insert(newBook, function (err, inserted) {
            if (err) throw err;
            res.send(
                (err === null) ? {msg: ''} : {msg: err}
            );
        });
    });

    app.post('/update', function (req, res) {

        dbCollection.update({_id: ObjectID(req.body._id)},
            {
                'title': req.body.title,
                'author': req.body.author,
                'genre': req.body.genre,
                'pages': req.body.pages,
                'published': req.body.published
            }, function (err, updated) {
                if (err) throw err;
                res.send("some");
            });
    });

    app.get('/getbook', function (req, res) {
        var query = {};
        var projection = {'_id': 1, 'title': 1, 'author': 1};
        dbCollection.find(query, projection).toArray(function (err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });

    app.get('/getbook/:id', function (req, res) {
        dbCollection.find({_id: ObjectID(req.params.id)}).toArray(function (err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });

    app.get('/delete/:ids', function (req, res) {
        var books = req.params.ids.split(',');
        books.forEach(function (bookItem, books) {
            dbCollection.remove({_id: ObjectID(bookItem)});
        });
        res.send("Books deleted");

    });

    app.listen(8083);
    console.log('App server listening on port 8083');
});
