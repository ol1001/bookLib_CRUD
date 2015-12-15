var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express();

MongoClient.connect('mongodb://localhost:27017/crudapp', function(err, db){
   "use strict";
    if(err) throw err;

    var dbCollection = db.collection('books');

    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/public/view'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/getbook', function(req, res){
        var query = {};
        dbCollection.find(query).toArray(function(err, docs) {
            if(err) throw err;
            res.json(docs);
        });
    });

    app.post('/save', function(req, res) {
        var newBook = req.body;
        dbCollection.insert(newBook, function(err, inserted){
            if(err) throw err;
            res.send(
                (err === null) ? {msg: ''} : {msg: err}
            );
        });
    });

    app.delete('/delete/:id', function(req, res){
        var itemForDeleting = req.params.id;
        dbCollection.remove({_id: ObjectID(itemForDeleting)}, function(err){
            res.send(
                (err === null) ? {msg: ''} : {msg: err}
            );
        });
    });

   app.post('/update/:id', function(req,res){
       var itemForUpdating = req.params.id;
        dbCollection.update({_id:ObjectID(itemForUpdating)},
            {'title':req.body.title,
                'author':req.body.author,
                'genre':req.body.genre,
                'published':req.body.published
            },function(err){
                res.send(
                    (err === null) ? {msg: ''} : {msg: err}
                );
            });
    });

    app.listen(8083);
    console.log('App server listening on port 8083');
});
